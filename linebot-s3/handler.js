'use strict';

var AWS = require("aws-sdk");
var LINEBot = require('line-messaging');
var md5 = require('md5');
var bot = LINEBot.create({
  channelID: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelToken: process.env.CHANNEL_TOKEN
});

var s3 = new AWS.S3({ apiVersion: '2006-03-01', region: 'ap-northeast-1' });
var BUCKET_NAME = 'linebot-s3';
var DIRECTORY_PATH = '/';
var FILE_NAME = '';

module.exports.hello = (event, context, callback) => {
  var events = JSON.parse(event.body).events; //body取得
  events.forEach(function(response, index, array) {
    console.log(response);
    if (response.type != "message") return;
    if (response.message.type != "image") return;

    // 画像取得
    bot.getMessageContent(response.message.id).then(function(data) {
      var image = new Buffer(data);
			FILE_NAME = md5(image) + '.png';

			var params = {
				Bucket: BUCKET_NAME,
				Key: DIRECTORY_PATH + FILE_NAME,
				Body: image
			};

			// S3に画像を保存する
      s3.putObject(params, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('Image upload success. file=' + DIRECTORY_PATH +  FILE_NAME);
				}
      });

    }).catch(function(err) {
      console.log(err);
    });
  });
};
