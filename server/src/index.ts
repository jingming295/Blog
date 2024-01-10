// src/index.ts
import express from 'express';
import cors from 'cors';
import loginRouter from './routes/Login/';
import registerRouter from './routes/Register';
import getUserProfileData from './routes/GetUserProfileData';
import keepLogin from './routes/KeepLogin';
import uploadArticle from './routes/UploadArticle';
import getArticleCardData from './routes/GetArticleCardData';
import getArticleContent from './routes/GetArticleContent';
import getArticleDataByAuthor from './routes/GetArticleDataByAuthor';
import articlePermission from './routes/ArticlePermission';
import deleteArticle from './routes/DeleteArticle';
import changeAvatar from './routes/UpdateAvatar';
import updateUserProfile from './routes/UpdateUserProfile';
import updateUserPassword from './routes/UpdateUserPassword';
import getLoginAndRegisterSettings from './routes/GetLoginAndRegisterSettings';
import updateLoginAndRegisterSettings from './routes/UpdateLoginAndRegisterSettings';
import getEmailSettings from './routes/GetEmailSettings';
import updateEmailSettings from './routes/UpdateEmailSettings';
import sendTestEmail from './routes/SendTestEmail';
import activateAccountRequest from './routes/ActivateAccountRequest';
import { Init } from './Init';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/avatars', express.static('Avatars'))

app.use(cors());

const routers = [
  loginRouter,
  registerRouter,
  getUserProfileData,
  keepLogin,
  uploadArticle,
  getArticleCardData,
  getArticleContent,
  getArticleDataByAuthor,
  deleteArticle,
  articlePermission,
  changeAvatar,
  updateUserProfile,
  updateUserPassword,
  getLoginAndRegisterSettings,
  updateLoginAndRegisterSettings,
  getEmailSettings,
  updateEmailSettings,
  sendTestEmail,
  activateAccountRequest
];
app.use('/', routers);

// 处理根路径
app.get('/', (req, res) =>
{
  res.send('-404');
});

app.listen(port, () =>
{
  console.log(`server run at: http://localhost:${port}`);
});

const init = new Init();
init.init();