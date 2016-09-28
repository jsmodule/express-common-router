import path from 'path';
import ExpressCommonRouter from '../lib';

const router = new ExpressCommonRouter();
router.controllerPath = path.join(__dirname, './js/controllers');

router.use('/hello', 'HelloController');
router.get('/test/index', 'TestController#index');
router.get('/test/show', 'TestController#show');

module.exports = router.routes();
