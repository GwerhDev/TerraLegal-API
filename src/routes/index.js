const router = require('express').Router();

const admin = require('../controllers/admin');

const auth = require('../controllers/auth');
const loginInner = require('../controllers/login-inner');
const getContent = require('../controllers/get-content');

router.use('/admin', admin);

router.use('/auth', auth);
router.use('/login-inner', loginInner);
router.use('/get-content', getContent);

module.exports = router;