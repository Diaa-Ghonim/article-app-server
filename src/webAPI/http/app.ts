import 'reflect-metadata';
import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import articleRouter from './routers/articleRouter';
import userRouter from './routers/userRouter';
import authRouter from './routers/authRouter';
import commonRouter from './routers/commonRouter';
import imageRouter from './routers/imageRouter';
import CustomMulter from './middlewares/multer';
import CloudinaryMiddleWare from './middlewares/cloudinary';
import ModifyHeaders from './middlewares/modifyHeaders';
import EndWith from './middlewares/endWith';
import dotenv from 'dotenv';
import { errorMiddleware } from './middlewares/error';
import { verifyToken } from './middlewares/authToken';
import { initializeTypeormConnection } from '../../infrastructure/db/initializeTypeormConnection';
dotenv.config();
const app: Application = express();

// import * as cors from 'cors';
const cors = require('cors');
app.use(cors({ origin: '*' }));
app.set('port', process.env.PORT || 5000);
app.use(ModifyHeaders);
app.use(CustomMulter);
app.use(CloudinaryMiddleWare);
app.use(EndWith);
app.use('/images', express.static(path.join(__dirname, '..', '..', '..', 'images')));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.get('/', (request: Request, response: Response) => {
  response.send('<p>first deploy</p>')
});
app.use('/api/auth', authRouter);
app.use('/api/common', commonRouter);
app.use('/api/articles', verifyToken, articleRouter);
app.use('/api/users', verifyToken, userRouter);
app.use('/api/images', imageRouter);
app.get('/api/search/:search', (request: Request, response: Response, next: NextFunction) => {
  // let { search } = request.params;
  // search = decodeURIComponent(search);

  // let searchLength = 'search='.length;
  // let searchValue = search.substr(searchLength, search.length);
  response.endWithSuccess(201, []);
})
app.use(errorMiddleware);

initializeTypeormConnection(); /**intialize typeorm connection with mongodb  */


export default app;
