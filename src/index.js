export { handler } from './resolvers';
import { storeMessage } from './resolvers';

export async function webTrigger(req) {
  try {
    const body = JSON.parse(req.body);
    const event = body.event;
    const name = body.name;

    if(!event || !name)
    {
      console.error("Body is missing event or name")
      console.error(body)
      return {
          outputKey: "status-error"
      }
    } 

    const result = await storeMessage(body)
    
    if (result.outputKey === "status-error") {
      console.error(result.message);
      return {
        outputKey: "status-error"
      }
    } else {
      console.debug(result.message)
      return {
        outputKey: "status-ok"
      }
  }
  } catch (error) {
    console.error(error);
    return {
      outputKey: "status-error"
    }
  }
}