global.locationid = 2;
global.apiServer = "eapi.pcloud.com"

const pcloud = require('pcloud-sdk-js');

const pCloudToken = process.env.PCLOUD_TOKEN
const client = pcloud.createClient(pCloudToken);

module.exports = {
  client
}