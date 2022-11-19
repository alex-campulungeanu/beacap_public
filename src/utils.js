const fs = require('fs');

const { locations }  = require('./config/constants')

const updateProjectsListEncr = (content) => {
  console.log('[+] locations.projectsEncr: ', locations.projectsEncr);
  fs.writeFileSync(locations.projectsEncr, content, err => {
    if (err) {
      throw 'Error when writing to project encrypt list file !'
    }
  });
}

const updateProjectsListDecr = (content) => {
  console.log('[+] locations.projectsEncr: ', locations.projectsEncr);
  fs.writeFileSync(locations.projectsDecr, content, err => {
    if (err) {
      throw 'Error when writing to project decrypt list file !'
    }
  });
}

const readProjectsEncr = () => {
  console.log('[+] locations.projectsEncr' ,locations.projectsEncr);
  const projects = fs.readFileSync(locations.projectsEncr)
  return projects
}

const readProjectsDecr = () => {
  // TODO: this function should return only the file, buffer should be done in ecnryption service part
  const projects = fs.readFileSync(locations.projectsDecr, 'utf-8')
  const buffered = Buffer.from(JSON.stringify(projects), "utf8")
  return buffered
}

const readProjectlocalhost = () => {
  const projects = fs.readFileSync(locations.projectsLocalhost, 'utf-8')
  return projects
}


module.exports = {
  updateProjectsListEncr,
  updateProjectsListDecr,
  readProjectsEncr,
  readProjectsDecr,
  readProjectlocalhost
}