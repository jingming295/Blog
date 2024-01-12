// src/routes/Register/index.ts
import express, { NextFunction, Request, Response } from 'express';
import { LoginData as LD, LoginDataFromClient } from '../../Return To Client/interface';
import { ChangeAvatar } from './changeAvatar';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb)
  {
    cb(null, 'Avatars/');
  },
  filename: function (req, file, cb)
  {
    const changeAvatar = new ChangeAvatar();
    const filename = changeAvatar.getFileName(file.path, 'Avatars', path.parse(file.originalname).name, path.parse(file.originalname).ext);
    cb(null, filename);
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: function (req, file, cb)
  {
    // 只接受图片文件
    if (file.mimetype.startsWith('image/'))
    {
      cb(null, true);
    } else
    {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

function transformUserData(UserData: LoginDataFromClient): LD
{
  return {
    ...UserData,
    encUserData: {
      ...UserData.encUserData,
      iv: Buffer.from(UserData.encUserData.iv.data),
      encryptedData: Buffer.from(UserData.encUserData.encryptedData.data),
      tag: Buffer.from(UserData.encUserData.tag.data)
    }
  } as LD;
}

router.post('/changeAvatar', upload.single('avatarFile'), async (req: Request, res: Response) =>
{
  try
  {
    const body = req.body as { UserData: string; };

    if (body.UserData === undefined || req.file === undefined)
    {
      res.json({ code: -101, message: 'Data is not complete' });
      return;
    }
    const changeAvatar = new ChangeAvatar();
    const parsedUserData:LoginDataFromClient = JSON.parse(body.UserData);
    const transformedUserData = transformUserData(parsedUserData);
    const data = { UserData: transformedUserData, avatarFile: req.file };
    const returndata = await changeAvatar.changeAvatar(data);
    res.json(returndata);
  } catch (err)
  {
    res.json({ code: -101, message: 'Error' });
    return;
  }

}, function (err: Error, req: Request, res: Response, next: NextFunction)
{
  if (err)
  {
    res.json({ code: -101, message: err.message });
  } else
  {
    next();
  }
});

export default router;