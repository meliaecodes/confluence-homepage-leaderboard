# Confluence Homepage Leaderboard

This project contains a Forge app written in Javascript that displays a simple Leaderboard, which shows information submitted via a webhook. 

In the following exercises you will convert this app which is currently using a manual refresh into a realtime app that automatically shows updated data. 


See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

You will need the latest version of the Forge CLI installed, and an Atlassian cloud developer site. 

## Exercise 1 - Install the demo app

1. Clone the repository locally
   ```
   TODO
   ```

2. Register this app to your developer account by running:
    ```
    forge register
    ```

3.  Install dependencies by running:
    ```
    npm install
    ```

4. Build and deploy your app by running:
    ```
    forge deploy
    ```

5. Install your app in an Atlassian site by running:
    ```
    forge install
    ```

## Explore the demo app

When you open your confluence homepage, you will see the app 'AtlasCamp Amsterdam Leaderboard' showing on the right of the homepage. 

![AtlasCamp Amsterdam Leaderboard app](resources/images/homepage.png)

Next, click on the Cog icon at the top right of the screen and then scroll down the administration menu on the left until you find **Apps**, click on the `>` to expand the list and select AtlasCamp Amsterdam Leaderboard Settings. 

Here you will find the curl command that you can use to send data to your apps leaderboard from the command line. 

Copy and paste the command into your command line to check that the app works. 

![Animated GIF showing step by step guide](resources/images/view_leaderboard_settings.gif)
