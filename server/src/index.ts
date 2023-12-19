// src/index.ts
import express from 'express';
import cors from 'cors';
import loginRouter from './routes/Login/';
import registerRouter from './routes/Register';
import userprofile from './routes/User Profile';
import keepLogin from './routes/KeepLogin'
import uploadArticle from './routes/UploadArticle';
import getArticleCardData from './routes/GetArticleCardData';
import getArticleContent from './routes/GetArticleContent';

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

const routers = [loginRouter, registerRouter, userprofile, keepLogin, uploadArticle, getArticleCardData, getArticleContent];
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
