Slack-Chat
==========

Slack-Chat is a very simple [Slack-RTM](https://api.slack.com/rtm) implementation. It very simply allows the capturing and responding of messages and comes bundled with a simple command example.

Try running `docs master routing`, for instance. The code for this command resides in `src/commands/docs.js` and is enabled in `src/commands/_impl.js`. You can see my sample message handling function that passes a message to the handler in the `bin/app.js` file, towards the bottom.

To run this all you need to do is have node installed and setup the *config* file in `src/config.js`. You'll need your User ID for the bot (so it doesn't respond to it's self!) and a Slack API key from your team (refer to Slack's own documentation for retrieving this).

Once done, execution is simple:
```bash
./bin/start
```
