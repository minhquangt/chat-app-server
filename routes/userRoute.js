const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');

router.get('/:currentUserId', userCtrl.getAllUser);
router.get('/info/:id', userCtrl.getInfo);
router.put('/:id', userCtrl.updateInfo);
router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

module.exports = router;
