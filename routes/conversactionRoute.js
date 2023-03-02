const router = require('express').Router();
const conversactionCtrl = require('../controllers/conversactionCtrl');

router.get('/:id', conversactionCtrl.getConversaction);
router.post('/', conversactionCtrl.createConversaction);

module.exports = router;
