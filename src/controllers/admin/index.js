const router = require('express').Router();

const user = require('./management-user');
const content = require('./management-content');

router.use("/management-user", user);
router.use('/management-content', content);


module.exports = router;