const path = require('path');
const appDir = path.resolve(process.cwd());

const locations = {
  projectsEncr: `${appDir}/projects_data/db_list_encrypted.txt`,
  projectsDecr: `${appDir}/projects_data/db_list_decrypted.json`,
  projectsLocalhost: `${appDir}/projects_data/db_list_localhost.json`,
  backups: `${appDir}/backup_data`,
}

const pcloudBackupDirIdProd = 2805773473
const pcloudBackupDirIdDev = 4094862896

const retentionDays = 30
const backupThreshold = 10 //the min amount of file kept as backup, no matter of how old they are

let pcloudBackupDirId = ''
if (process.env.NODE_ENV =='prod') {
  pcloudBackupDirId = pcloudBackupDirIdProd
} else {
  pcloudBackupDirId = pcloudBackupDirIdDev
}

module.exports = {
  pcloudBackupDirId,
  locations,
  retentionDays,
  backupThreshold
}