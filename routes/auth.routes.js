import { Router } from 'express'
import controller from '../controllers/auth.controller.js'

const router = Router();

router.get('/', controller.index);

router.get('/auth', controller.auth);

router.get('/login', controller.login);
router.post('/newLogin', controller.logear);

router.get('/signIn', controller.signIn);
router.post('/newsignIn', controller.newsignIn);

router.get('/logout', controller.logout)

router.get('/getData', controller.getData);
router.put('/updateData/:id', controller.updateData);

export default router;