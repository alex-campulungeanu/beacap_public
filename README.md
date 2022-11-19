<h1 align="center">
<br>
beacap
</h1>

<p align="center">backup small Postgres</p>

<hr />
<br />

## 📚 Project Definition

Backup small PostgreSQL DB's and update the result to storage provider.


## 🛠️ Features

The app uses these technologies:

- ⚛️ **Node.js**
- 🎯 **Docker**
- **Github Actions**


## 🛠️ Development
- create new ENCRYPT_KEY to encrypt credentials files
- create new PCLOUD_TOKEN for pCloud provider
- decrypt the file: npm run decrypt
- encrypt the file: npm run encrypt

## 🚢 Docker development

Also, a docker container can be used:
`docker-compose up -d` 
- 1. need to install sudo
- 2. ./install_pgdump.sh

## ACT
act -r --secret-file .env

## Platform
https://www.pcloud.com/eu