import express from 'express';
import articleController from '../../controllers/ArticleController';

const router = express.Router();

router.get('/articles', articleController.getLatestArticles);

export default router;