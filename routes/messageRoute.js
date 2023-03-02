const router = require('express').Router();
const messageCtrl = require('../controllers/messageCtrl');

router.get('/:conversactionId', messageCtrl.getMessage);
router.post('/', messageCtrl.createMessage);

module.exports = router;
