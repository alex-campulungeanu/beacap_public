require('dotenv').config()

const { encrypt, decrypt } = require('../encryption-service')
const { readProjectsEncr, readProjectsDecr, updateProjectsListDecr, updateProjectsListEncr, readProjectlocalhost} = require('../utils')

const encryptCredentials = (updateFile) => {
  const projectsPlain = readProjectsDecr()
  const encryptedData = encrypt(Buffer.from(projectsPlain))
  if (updateFile) {
    updateProjectsListEncr(encryptedData)
  }
  return encryptedData
}

const decryptCredentials = (updateFile) => {
  const projects = readProjectsEncr()
  const decryptedData = decrypt(Buffer.from(projects))
  if (updateFile) {
    updateProjectsListDecr(decryptedData.toString())
  }
  return decryptedData
}

const getCredentials = (environment) => {
  let projectsCredentials
  if (environment == 'dev') {
    projectsCredentials = readProjectlocalhost()
  } else if (environment == 'prod') {
    projectsCredentials = decryptCredentials(false)
  }
  return JSON.parse(projectsCredentials)
}

module.exports = {
  encryptCredentials,
  decryptCredentials,
  getCredentials
}