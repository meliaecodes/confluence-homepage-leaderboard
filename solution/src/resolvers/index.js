import Resolver from '@forge/resolver';
import { webTrigger } from '@forge/api';
import { kvs } from '@forge/kvs';
import { publishGlobal } from '@forge/realtime';


export const storeMessage = async (event) => {
  let eventArray = await kvs.get(event.event);
  if(eventArray) {
    try {
      await kvs.set(event.event, [...eventArray, event.name]);
      publishGlobal('realtime-leaderboard', event.event);
      return ({
        outputKey: "status-ok",
        message: "updated existing event"
      })
    } catch (err) {
      return ({
        outputKey: "status-error",
        message: "error storing data"
      })
    }
  }
  else {
    try {
      await kvs.set(event.event, [event.name]);
      publishGlobal('realtime-leaderboard', event.event);
      return ({
        outputKey: "status-ok",
        message: "created new event"
      })
    } catch (err) {
      return ({
        outputKey: "status-error",
        message: "error storing data"
      })
    }
  }

}

const resolver = new Resolver();

resolver.define('getTriggerUrl', () => {
  return webTrigger.getUrl("forge-web-trigger")
}); 

resolver.define('getEventValues', (req) => {
  console.log('get kvs values')
  console.log(req.payload.event)
  return kvs.get(req.payload.event)
});

resolver.define('getEventNames', () => {
  console.log('Getting all events...')
  return kvs.query().getMany();
});

resolver.define('deleteEventData', async (req) => {
  console.log('Deleting data...' + req.payload)
  await kvs.delete(req.payload);
  return kvs.query().getMany();
});

export const handler = resolver.getDefinitions();
