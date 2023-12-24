# Blog

## Web Development Project

## Intro

This project include backend and frontend. Backend files all in server/

Before start, please make sure your computer has Node.js installed https://nodejs.org/en

To start, please clone this project to your pc.

Import the sql into your database name blog

After that, go to the root of the project, run ```npm install```, after that, run ```npm run dev```

After that, go to the server folder,  run ```npm install```, after that, run ```npm run dev```

Finally, you can access this website via http://localhost:8080/

## TODO Plan

- [ ] Login and Register
  - [x] Encrypt Password
  - [x] Perform Register
  - [x] Perform Login 
  - [ ] Email Verification
- [x] Keep Login Status
  - [x] Encrypt data
    - [ ] (editional) 每次前端和后端交互的时候，把密码和用户名合并加密混淆作为私钥，然后你后端先发个随机密钥包给前端，再发一个私钥+随机密码包加密的给前端，判断两者是否相同。相同则再发送一个随机密钥包，作为cookie，然后每次访问后端的时候，需要权限验证的地方，发送的header里面的auther:随机密钥包，然后和后端验证是否一致。验证完后刷新随机密钥包，并且下放一个新的密钥包。然后前端覆盖原先的密钥包。甚至可以把这个用户名和密码合并混淆加密的包伪装为图片发到后端。然后前端js混淆加密
- [x] View Article
- [ ] Manage Article
  - [x] Post Article
  - [x] Edit Article
  - [x] Delete Article
- [ ] User Profile Page - 20% progress
  - [ ] User Profile Edit