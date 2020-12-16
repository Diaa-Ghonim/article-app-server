import { Router } from 'express';
import userController from '../../controllers/userController';
const router = Router();

router.put('/', userController.updateUser);
router.get('/best-writers', userController.getBestWriters);
router.get('/auth', userController.checkUserAuth);
router.post('/follow', userController.follow);
router.post('/unfollow', userController.unfollow);
router.put('/increment-rate/:username', userController.incrementRateUser);
router.put('/decrement-rate/:username', userController.decrementRateUser);
router.delete('/:username', userController.deleteUser);
router.get('/:username', userController.getUser);

export default router;
