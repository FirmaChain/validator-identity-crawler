# validator-identity-crawler
![스크린샷 2023-07-17 오후 8 50 21](https://github.com/FirmaChain/validator-identity-crawler/assets/93503020/aed333af-2c3f-4fb0-93e1-c8605b2d09dd)

## Features
This project provides the latest profile image link of the validator, and a scheduling task is performed every hour using Ubuntu cron. When the scheduling task runs, it compares the previous profile image link and if there are changes, it commits and pushes them to the public/identity.json file.

</br></br>

## Build Instructions
You can proceed with the build in the following order.

</br>

### Git Credential Setup
As the scheduling task runs, it commits and pushes to Git. To perform these tasks, you need Git login information, so you need to save authentication information.
```bash
$ git config credential.helper store
```
Once you enter your username and password, you won't need to enter it again.

</br>

### Crontab Instructions
```bash
# Edit crontab
$ crontab -e

# Enter the following on a new line
# (Modify the path of the working directory to fit your actual environment)
$ 0 * * * * cd ~/validator-identity-crawler && npm run start >> crawler_reslut.txt
```

</br>

### Build Procedure
```bash
# Clone repository
$ git clone https://github.com/FirmaChain/validator-identity-crawler.git

# Move to the project folder
$ cd validator-identity-crawler

# Install necessary packages
$ npm install
```

</br>

### First Time Running for Git Authentication
An initial run is required to save user authentication information to the ~/.git-credentials file.
```bash
# Run the project
$ npm run start
```
