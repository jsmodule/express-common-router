import path from 'path';
import ExpressCommonRouter from '../lib';

const router = new ExpressCommonRouter();
router.path = path.join(__dirname, './js/handlers');

router.use('/hello', 'Hello');
router.get('/test/index', 'Test#index');
router.get('/test/show', 'Test#show');
router.all('*', 'NotFound');

module.exports = router.routes();
