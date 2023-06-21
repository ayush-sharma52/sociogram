import express from 'express';
import { getUser,
getFreinds,
updateFreinds } from '../controller/User.js';
const router = express.Router();
import {auth} from '../middleware/auth.js';

/* READ */
router.get('/:id',auth,getUser);
router.get('/:id/freinds',auth,getFreinds);

/* UPDATE */
router.patch('/:id/:freindId',auth,updateFreinds)

export default router; 