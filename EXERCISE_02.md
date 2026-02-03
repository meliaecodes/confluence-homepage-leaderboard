# Exercise 2 - Subscribe to realtime events

[Forge Realtime](https://developer.atlassian.com/platform/forge/realtime/) makes it possible to send event between different instances of your Forge app - including across different browsing contexts. 

For example, it is now possible to publish events from your Forge backend to your Forge frontend. 

In this exercise, you will review the structure of the app, then modify it to automatically publish new items in the [Confluence Homepage Feed](TODO) when the webhook is triggered. 

## Review the app source

Take a moment to review the source for the app to understand how the Leaderboard is displayed on the confluence homepage. 

First, take a look at the [manifest.yml](manifest.yml) and note how the app is structured.  

The `confluence:homepageFeed:` module displays the app defined in [src/frontend/homepageFeed.jsx](src/frontend/homepageFeed.jsx) 

When the app is loaded, or refreshed it invokes `getEventNames` in the [resolvers/index.js](resolvers/index.js)


## Create an event subscription in the frontend

To start, create a new [subscription](https://developer.atlassian.com/platform/forge/apis-reference/ui-api-bridge/realtime/) to realtime events in the app frontend: 

1. Open [src/frontend/homepageFeed.jsx](src/frontend/homepageFeed.jsx) and add `realtime` to your imports from `@forge/bridge`:
   ```
   import { invoke, realtime } from '@forge/bridge';
   ```
2. Next, modify the `useEffect` that is triggered when the app is initially rendered so that it creates a new realtime subscription
    ```
    useEffect(() => {
      invoke("getEventNames").then(setEventNames);

      // Add the new realtime subscription
      const globalSubscription = realtime.subscribeGlobal("realtime-leaderboard", handleRefresh)
    }, []);
    ```
3. Now, create the `handleRefresh` function
    ```
    const handleRefresh = (eventName) => {
      setRefreshing(true);
      invoke("getEventNames").then(result => {
        setEventNames(result);
        setRefreshing(false);
      })
    }
    ```
4. Finally, you will need to add the `read:app-global-channel:realtime` scope to the app permissions in your [manifest.yml](manifest.yml):
    ```
    permissions:
      scopes:
        - storage:app
        - read:app-global-channel:realtime
    ```
5. Deploy the changes to your app
    ``` 
    forge deploy
    ```
6. You will automatically be prompted to run `forge install --upgrade` since you have added a new scope. 

## Verify the app is still working

*At this point, the app still won't automatically refresh since nothing is publishing an event for the subscription to receive - but it's worth checking that the app is still working as expected before moving on to [exercise 3](EXERCISE_03.md).* 