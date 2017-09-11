'use strict';
require('date-utils');

var gce = require('@google-cloud/compute')({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.CREDENTIALS_FILE_PATH
});

var dt = new Date();
var formatted = dt.toFormat("YYYYMMDD");
var zone = gce.zone(process.env.INSTANCE_ZONE);
var disk = zone.disk(process.env.INSTANCE_DISK_NAME);
var snapshotName =  'snapshot-' + process.env.INSTANCE_DISK_NAME + '-' + formatted;

module.exports.createSnapshot = (event, context, callback) => {
  
  disk.createSnapshot(snapshotName).then(function(data) {
    console.log(data);
  });
};

