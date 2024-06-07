const router = require('express').Router();

const admin = require('../controllers/admin');

const auth = require('../controllers/auth');
const loginInner = require('../controllers/login-inner')

router.use('/admin', admin);

router.use('/auth', auth);
router.use('/login-inner', loginInner);

module.exports = router;