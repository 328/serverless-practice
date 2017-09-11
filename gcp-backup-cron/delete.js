'use strict';
require('date-utils');

var gce = require('@google-cloud/compute')({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.CREDENTIALS_FILE_PATH
});

var dt = new Date();
dt.setDate(dt.getDate() - 5);
var formatted = dt.toFormat("YYYYMMDD");
var zone = gce.zone(process.env.INSTANCE_ZONE);
var disk = zone.disk(process.env.INSTANCE_DISK_NAME);
var snapshotName =  'snapshot-' + process.env.INSTANCE_DISK_NAME + '-' + formatted;

module.exports.deleteSnapshot = (event, context, callback) => {
  
  var deleteSnapshotName = gce.snapshot(snapshotName);
  deleteSnapshotName.delete().then(function(data) {
      console.log(data);
  });
};
