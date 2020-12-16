import Router from 'express';
import ImageController from '../../controllers/imageController';
const router = Router();

router.post('/upload-images', ImageController.uploadImages);

export default router;