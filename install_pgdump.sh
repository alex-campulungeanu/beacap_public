#!/bin/bash

sudo -E apt update
sudo -E apt -y install gnupg2 wget lsb-release
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo -E apt-key add -
echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" | sudo -E tee  /etc/apt/sources.list.d/pgdg.list

sudo -E apt update
sudo -E apt -y install  postgresql-client-13
# apt -y install postgresql-13 postgresql-client-13