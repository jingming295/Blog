// src/index.ts
import express from 'express';
import cors from 'cors';
import loginRouter from './routes/Login/';
import registerRouter from './routes/Register';
import userprofile from './routes/User Profile';
import keepLogin from './routes/KeepLogin'

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());

const routers = [loginRouter, registerRouter, userprofile, keepLogin];
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
