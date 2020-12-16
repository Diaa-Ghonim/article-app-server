import { Router } from 'express';

import articleController from '../../controllers/ArticleController';

const router = Router();

router.post('/', articleController.createArticle);
router.put('/', articleController.editArticle);
router.get('/', articleController.getArticles);
router.get('/top-reading', articleController.getTopReadingArticles);
router.get('/liked/:username', articleController.getLikedArticles);
router.get('/disliked/:username', articleController.getDislikedArticles);
router.get('/shared/:username', articleController.getSharedArticles);
router.get('/saved/:username', articleController.getSavedArticles);
router.post('/like', articleController.likeArticle);
router.post('/remove-like', articleController.removeLikeFromTheArticle);
router.post('/dislike', articleController.dislikeArticle);
router.post('/remove-dislike', articleController.removeDislikeFromTheArticle);
router.post('/share', articleController.shareArticle);
router.post('/save', articleController.saveArticle);
router.post('/remove-save', articleController.removeSaveFromArticle);
router.get('/:username', articleController.getUserArticles);
router.get('/:username/:articleID', articleController.getArticle);
router.delete('/:articleID', articleController.deleteArticle);

export default router;
