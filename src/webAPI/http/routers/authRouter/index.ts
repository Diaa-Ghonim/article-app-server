import express from 'express';
import userController from '../../controllers/userController';

const router = express.Router();

router.post('/signup', userController.createUser);
router.post('/signin', userController.signin);

export default router;