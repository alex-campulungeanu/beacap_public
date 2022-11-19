const { locations, pcloudBackupDirId, retentionDays, backupThreshold} = require('../../config/constants')

const { client } = require('./client')

const uploadFile = async (file) => {
  const { upload } = client;
  if (process.env.NODE_ENV =='prod') {
    console.log(`[+] Upload file to PROD: ${file}`)
  } else {
    console.log(`[+] Upload file to DEV: ${file}`)
  }
  const resp = await upload(`${locations.backups}/${file}`, pcloudBackupDirId, {
    onBegin: () => console.log('[+] Begin upload from API'),
    onProgress: ({ loaded, total }) => console.log(loaded, total, (loaded / total * 100).toFixed(2) + '%')
  })
  return 'Upload succesful !'
}

const removeOldFiles = async () => {
  // group files by project and remove files older than X days
  let res = []
  const { listfolder, deletefile } = client
  const folderInfo = await listfolder(pcloudBackupDirId)
  const fileList = folderInfo['contents']
  let groupedFileList = {}
  for(let file of fileList) {
    const fileName = file.name
    const project = fileName.split("_").slice(0, 2).join("_")
    const created = file.created
    // group files by project
    if (typeof groupedFileList[project] == 'undefined') {
      groupedFileList[project] = [file]
    } else {
      groupedFileList[project] = [...groupedFileList[project], file]
    }
  }
  const markedForDelete = []
  for (let proj in groupedFileList) {
    if (groupedFileList[proj].length > backupThreshold) {
      for (let fileGrouped of groupedFileList[proj]) {
        const createDate = fileGrouped['created']
        const daysBetween = (new Date() - new Date(createDate)) / (1000 * 3600 * 24)
        if (daysBetween > retentionDays) {
          markedForDelete.push(fileGrouped)
        }
      }
    }
  }
  // console.log(`[+] Files marked for delete: `, markedForDelete)
  for (const file of markedForDelete) {
    try {
      await deletefile(file.fileid)
      res.push(file.name)
      console.log(`Delete file with id: ${file.fileid}`)
    } catch (error) {
      console.log(error)
      console.log(`[+ ] ERROR when deleting file ${file.id} / ${file.name}`)
    }
  }

  return res
}


module.exports = {
  uploadFile,
  removeOldFiles
}