require('dotenv').config()
const { cleanBackups } = require('../backup-service')

cleanBackups()
  .then((res) => {
    console.log(`Files deleted: ${res}`)
  })