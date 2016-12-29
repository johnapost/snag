var Botkit = require('botkit');
var queue = require('./lib/queue');

if (!process.env.VERIFICATION_TOKEN) {
  console.log('Error: Specify VERIFICATION_TOKEN in environment');
  process.exit(1);
}

if (!process.env.PORT) {
  console.log('Error: Specify PORT in environment');
  process.exit(1);
}

var config = {debug: true};
var controller = Botkit.slackbot(config);

controller.setupWebserver(process.env.PORT, function (err, webserver) {
  if (err) {
    console.error('Cannot start webserver.');
    process.exit(1);
  }

  webserver.get(['/', '/health', '/status'], (req, res) => {
    res.send({health: 'butts'});
  });

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

      // ***** help/halp/'': Return help text *****
      if (!message.text.length ||
        message.text.includes('help') ||
        message.text.includes('halp')
      ) {
        slashCommand.replyPrivate(message, queue.helpText());
      }

      // ***** ls: List all of the resources *****
      if (message.text.includes('ls')) {
        slashCommand.replyPrivate(message, queue.listQueues());
      }

      const resource = message.text.split(' ')[1];

      // ***** claim: Claiming a resource *****
      if (message.text.includes('claim')) {
        if (!resource) {
          slashCommand.replyPrivate(
            message,
            'You have to specify a resource to claim, silly.');
        }

        slashCommand.replyPrivate(
          message,
          queue.claim(resource, message.user_name));
      }

      // ***** release: Releasing a resource *****
      if (message.text.includes('release')) {
        slashCommand.replyPrivate(
          message,
          queue.release(message.user_name, resource));
      }

      // ***** who: Lists who has claimed a resource *****
      if (message.text.includes('who')) {
        if (!resource) {
          slashCommand.replyPrivate(
            message,
            queue.all());
        }

        slashCommand.replyPrivate(
          message,
          queue.whois(resource));
      }

      // // ***** `resource`: alias for claiming a resource *****
      if (queue.store[message.text]) {
        slashCommand.replyPrivate(
          message,
          queue.claim(message.text, message.user_name)
        );
      }

      break;
    default:
      slashCommand.replyPublic(message, 'I\'m afraid I don\'t know how to ' + message.command + ' yet.');
  }
});
