# Exercise 3 - Publish a realtime event when triggered 

In [Exercise 2](EXERCISE_02.md) you started a subscription to realtime events. 

`const globalSubscription = realtime.subscribeGlobal("realtime-leaderboard", handleRefresh)`

In this exercise you will publish an event from the Resolver in response to a webhook being triggered.

## Review the app source

Take a moment to review the source for the app to understand what happens when a webtrigger is received.  

First, take a look at the [manifest.yml](manifest.yml) and note how the app is structured.  

The `webtrigger` module invokes the `webTrigger` function within [src/index.js](src/index.js)

The `webTrigger` function then parses the data and if it includes a body then it calls the `storeMessage` function in [src/resolvers/index.js](src/resolvers/index.js)

The `storeMessage` function then stores the data in the key value store. This is the point at which our app could publish an event that triggers the frontend to refresh. 


### Note
For simplicity there isn't any error checking, or checking for inappropriate language in the incoming data.  This app is for demonstration purposes only. 

## Modify the resolver to publish an event when triggered

1. Open [src/resolvers/index.js](src/resolvers/index.js) and add the following import:
    ```
    import { publishGlobal } from '@forge/realtime';
    ```
2. Within the `storeMessage` function, add a `publishGlobal` call before each of the successful return statements:
    ```
    export const storeMessage = async (event) => {
      let eventArray = await kvs.get(event.event);
      if(eventArray) {
        try {
          await kvs.set(event.event, [...eventArray, event.name]);
          // publish the event to the realtime-leaderboard channel
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
          // publish the event to the realtime-leaderboard channel
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
    ```
3. Before deploying, install the realtime package
    ```
    npm install @forge/realtime
    ```
4. Deploy the changes to your app
    ``` 
    forge deploy
    ```

## Verify the app refreshes automatically

Now that the changes have been deployed, open your Confluence homepage so that your Leaderboard is displayed, then add an item to the leaderboard using the curl command from [Exercise 1](EXERCISE_01.md). 


## Next steps

Why not try updating an existing app with polling or refresh buttons to use Realtime. 

[Review the realtime docs](https://developer.atlassian.com/platform/forge/realtime/)
