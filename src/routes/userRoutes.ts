import { Router } from 'express';
import { getUser, createUser, updateUser } from '../controllers/userController.ts';

const router = Router();

router.get('/', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);

export default router;