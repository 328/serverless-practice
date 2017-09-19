'use strict';

function slack_post(message) {
  var Slack = require('slack-node');
  var webhookUri = process.env.WEBHOOK_URL;

  var slack = new Slack();
  slack.setWebhook(webhookUri);

  slack.webhook({
    channel: process.env.CHANNEL,
    username: process.env.USERNAME,
    text: message,
  }, function(err, response) {
    console.log(response);
  });
};

module.exports.hello = (event, context, callback) => {
  var decodestr = decodeURIComponent(event.body.slice(8));
  console.log(decodestr);
  var text = JSON.parse(decodestr);
  var message = '';
  if (text.action == "opened") {
    message = "Open Pull Request : " + text.pull_request.title + "\n" + text.pull_request.html_url;
    slack_post(message);
  } else if (text.action == "closed") {
    message = "Closed Pull Request : " + text.pull_request.title + "\n" + text.pull_request.html_url;
    slack_post(message);
  }
};
