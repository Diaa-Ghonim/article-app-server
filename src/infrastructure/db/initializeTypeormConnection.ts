import { createConnection } from 'typeorm';
import { EntityUser } from './entities/user/index';
import { EntityArticle } from './entities/article/index';

export const initializeTypeormConnection = async function () {

  try {
    await createConnection({
      type: 'mongodb',
      useUnifiedTopology: true,
      useNewUrlParser: true,
      database: 'articleapp',
      url: process.env.NODE_ENV === 'production' ? process.env.MONGO_DB_URI : '',
      entities: [EntityUser, EntityArticle],

    });

    console.log('connection with database is success ...')
  } catch (error) {
    console.log(error);
    console.log('connection with database is failure ...');
  }
}
