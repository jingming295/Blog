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
import getAllArticleArea from './routes/GetAllArticleArea';
import getAllColorScheme from './routes/GetAllColorScheme';
import deleteColorScheme from './routes/DeleteColorScheme';
import addColorScheme from './routes/AddColorScheme';
import getAllArticleBigArea from './routes/GetAllArticleBigArea';
import deleteBigArea from './routes/DeleteBigArea';
import updateBigArea from './routes/UpdateBigArea';
import addBigArea from './routes/AddBigArea';
import updateSubArea from './routes/UpdateSubArea';
import deleteSubArea from './routes/DeleteSubArea';
import addSubArea from './routes/AddSubArea';
import { Init } from './Init';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/avatars', express.static('Avatars'));

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
  activateAccountRequest,
  getAllArticleArea,
  getAllColorScheme,
  deleteColorScheme,
  addColorScheme,
  getAllArticleBigArea,
  deleteBigArea,
  updateBigArea,
  addBigArea,
  updateSubArea,
  deleteSubArea,
  addSubArea
];
app.use('/', routers);

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