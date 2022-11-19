const { takeAllBackups } = require('../backup-service');
const { getCredentials } = require('./encrypt-projects');

const projectsCredentials = getCredentials(process.env.NODE_ENV)

takeAllBackups(projectsCredentials)
  .then(([currentBackups, failedBackups]) => {
    console.log(`[+] Backups success: ${currentBackups}`);
    console.log(`[+] Backups failed: ${failedBackups}`);
  })
  .catch(error => {
    console.log('[+] Unable to do backups');
    console.log(error);
  })
