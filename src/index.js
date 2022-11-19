require('dotenv').config()

const { uploadBackup, takeAllBackups, cleanBackups} = require('./backup-service')
const { getCredentials } = require('./scripts/encrypt-projects')

const main = async () => {
  console.log('[+] START !')
  console.log(`[+] ENVIRONMENT: ${process.env.NODE_ENV}`);
  const projectsCredentials = getCredentials(process.env.NODE_ENV)
  // const credArr = JSON.parse(projectsCredentials)
  const [currentBackups, failedBackups] = await takeAllBackups(projectsCredentials)
  if (process.env.NODE_ENV == 'prod') {
    for await (const backup of currentBackups) {
      await uploadBackup(backup)
    }
  }
  // await cleanBackups()
  if (failedBackups.length != 0) {
    console.log(`[+] Failed backups: ${failedBackups}`);
  }
}

main()
  .then(() => console.log('[+] FINISH !'))
  .catch(err => console.log(err))