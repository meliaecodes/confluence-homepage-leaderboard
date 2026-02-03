import Resolver from '@forge/resolver';

export const storeMessage = async (event) => {
  //TODO - error handling
  let eventArray = await kvs.get(event.event);
  if(eventArray) {
    await kvs.set(event.event, [...eventArray, event.name]);
    return ({
      outputKey: "status-ok",
      message: "updated existing event"
    })
  }
  else {
    await kvs.set(event.event, [event.name]);
    return ({
      outputKey: "status-ok",
      message: "created new event"
    })
  }
  return ({
    outputKey: "status-error",
    message: "error storing data"
  })
}

const resolver = new Resolver();

resolver.define('getText', (req) => {
  console.log(req);

  return 'Hello, world!';
});

export const handler = resolver.getDefinitions();
