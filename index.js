var Botkit = require('botkit');

if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.PORT || !process.env.VERIFICATION_TOKEN) {
  console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
  process.exit(1);
}

var config = {};

var controller = Botkit.slackbot(config).configureSlackApp({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  scopes: ['commands']
});

controller.setupWebserver(process.env.PORT, function (err, webserver) {
  controller.createWebhookEndpoints(controller.webserver);

  controller.createOauthEndpoints(controller.webserver, function (err, req, res) {
    if (err) {
      res.status(500).send('ERROR: ' + err);
    } else {
      res.send('Success!');
    }
  });
});

controller.on('slash_command', function (slashCommand, message) {
  switch (message.command) {
    case '/snag':
      if (message.token !== process.env.VERIFICATION_TOKEN) return; // just ignore it.

      message.text;

      // if no text was supplied, treat it as a help command
      if (message.text === '' || message.text === 'help') {
        slashCommand.replyPrivate(message, "I don't know what I'm doing help!!!");
        return;
      }

      // // If we made it here, just echo what the user typed back at them
      // //TODO You do it!
      // slashCommand.replyPublic(message, "1", function() {
      //     slashCommand.replyPublicDelayed(message, "2").then(slashCommand.replyPublicDelayed(message, "3"));
      // });

      break;
    default:
      slashCommand.replyPublic(message, "I'm afraid I don't know how to " + message.command + ' yet.');
  }
});
