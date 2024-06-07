const router = require('express').Router();

const user = require('./management-user');

router.use("/management-user", user);

module.exports = router;