'use strict';

var AWS = require("aws-sdk");
var rekognition = new AWS.Rekognition();
var LINEBot = require('line-messaging');
var bot = LINEBot.create({
  channelID: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelToken: process.env.CHANNEL_TOKEN
});

module.exports.hello = (event, context, callback) => {
  var events = JSON.parse(event.body).events; //body取得
  events.forEach(function(response, index, array) {
    console.log(response);
    if (response.type != "message") return;
    if (response.message.type != "image") return;

    // 画像取得
    bot.getMessageContent(response.message.id).then(function(data) {
      var param = {
        Image: {
          Bytes: new Buffer(data)
        }
      };

      // ラベル付け
      rekognition.detectLabels(param, function(err, data) {
        if (err) {
          console.log(err, err.stack);
        } else {
          console.log(JSON.stringify(data));
          data.Labels.forEach(function(label) {
            if (label.Name == 'Food' && Math.round(label.Confidence) >= 60) {
              var mes = 'ピーピーピー！飯テロ警察です。飯テロ禁止条例により処罰します^^';
              bot.replyTextMessage(response.replyToken, mes).then(function(data) {}).catch(function(err) {});
            }
          });
        }
      });

    }).catch(function(err) {
      console.log(err);
    });
  });
}
