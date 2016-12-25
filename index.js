var Botkit = require('botkit');
var queue = require('./lib/queue');

if (!process.env.VERIFICATION_TOKEN || !process.env.PORT) {
  console.log('Error: Specify VERIFICATION_TOKEN and PORT in environment');
  process.exit(1);
}

var config = {debug: true};
var controller = Botkit
  .slackbot(config);

controller.setupWebserver(process.env.PORT, function (err, webserver) {
  if (err) {
    console.error('Cannot start webserver.');
    process.exit(1);
  }
  controller.createWebhookEndpoints(controller.webserver);
});

controller.on('slash_command', function (slashCommand, message) {
  console.log('message is', message);
  /**
    message is { token: 'xb8NkYtcshPQ50gBIU1EpSDi',
    team_id: 'T0258D76V',
    team_domain: 'ownlocal',
    channel_id: 'C3HEK4Q6M',
    channel_name: 'skynet',
    user_id: 'U1US9RX7B',
    user_name: 'angeloette',
    command: '/snaggg',
    text: 'help',
    response_url: 'https://hooks.slack.com/commands/T0258D76V/121315834294/Vhx5DLuzsnPvuYqpRojJwMuA',
    user: 'U1US9RX7B',
    channel: 'C3HEK4Q6M',
    type: 'slash_command' }
   */
  switch (message.command) {
    case '/snaggg':
      // Ignore messages without a correct verification token from Slack.
      if (message.token !== process.env.VERIFICATION_TOKEN) return;

      // if no text was supplied, treat it as a help command
      if (!message.text.length ||
        message.text.includes('help') ||
        message.text.includes('halp')
      ) {
        slashCommand.replyPrivate(message, queue.helpText());
      }

      if (message.text.includes('claim')) {
        const resource = message.text.split(' ')[1];
        if (!resource) {
          slashCommand.replyPrivate(
            message,
            'You have to specify a resource to claim, silly.');
          break;
        }

        slashCommand.replyPrivate(
          message,
          queue.claim(resource, message.user_name));
        break;
      }
      break;
    default:
      slashCommand.replyPublic(message, 'I\'m afraid I don\'t know how to ' + message.command + ' yet.');
  }
});
