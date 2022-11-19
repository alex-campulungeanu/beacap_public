const { execute } = require('@getvim/execute')
const fs = require('fs');
const path = require('path')

const { locations } = require('./config/constants')
const { uploadFile, removeOldFiles } = require('./providers/pcloud/upload')

const backupExtension = '.sql'

const takeBackup = async (project, username, password, database, host, port) => {
  console.log(`[+] START backup for ${project}`);
  const date = new Date()
  const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  const backupFileAll = `${project}_all_${today}${backupExtension}`
  const backupFileData = `${project}_data_${today}${backupExtension}`
  const backupOutputAll = `${locations.backups}/${backupFileAll}`
  const backupOutputData = `${locations.backups}/${backupFileData}`
  const backupCommandAll = `PGPASSWORD="${password}" pg_dump -U ${username} -h ${host} -p ${port} -d ${database} -f ${backupOutputAll}`
  const backupCommandData = `PGPASSWORD="${password}" pg_dump -U ${username} -h ${host} -p ${port} -d ${database} -f ${backupOutputData} --column-inserts --data-only`
  try {
    await execute(backupCommandAll)
    await execute(backupCommandData)
    console.log(`[+] Backup created succesfully for: ${project}`);
    return [backupFileAll, backupFileData]
  } catch (error) {
    console.log(`[+] Error for backup ${project}`);
    return Promise.reject(error)
  }
}

const uploadBackup = async (file) => {
  console.log(`[+] Upload backup: ${file}`);
  await uploadFile(file)
}

const takeAllBackups = async (credentials) => {
  let currentBackups = []
  let failedBackups = []
  // await Promise.all(
  //   credentials.map(async project => {
  for await (let project of credentials) {
    try {
      console.log(`[+] Do backup for: ${project.project}`)
      const filesList = await takeBackup(project.project, project.username, project.password, project.database, project.host, project.port)
      currentBackups.push(...filesList)
      console.log(`[+] Successful backup for: ${project.project}`)
    } catch (error) {
      console.log(error);
      failedBackups.push(project.project)
      // return Promise.reject('Unable to proceed with backup !')
    }
  }
    // })  
  // )
  return [currentBackups, failedBackups]
}

const checkBackup = async () => {
  let backupFiles = []
  const files = fs.readdirSync(`${locations.backups}`)
  files.forEach(file => {
    if (path.extname(file) == `${backupExtension}`) {
      backupFiles.push(file)
    }
  })
  return backupFiles
}

const cleanBackups = async () => {
  const res = await removeOldFiles()
  return res
}

module.exports = {
  checkBackup,
  uploadBackup,
  takeAllBackups,
  cleanBackups
}