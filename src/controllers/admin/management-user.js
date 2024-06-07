const router = require('express').Router();
const { decodeToken } = require('../../integrations/jwt');
const { message } = require('../../messages');
const { roles } = require('../../misc/consts-roles');
const userSchema = require("../../models/User");
const bcrypt = require("bcrypt");

router.post('/create', async (req, res) => {
  try {
    const userToken = req.headers.authorization;
    if (!userToken) return res.status(403).json({ message: message.admin.permissionDenied });

    const decodedToken = await decodeToken(userToken);
    if (decodedToken?.data?.role !== roles.admin) return res.status(403).json({ message: message.admin.permissionDenied });

    const { username, password } = req.body;
    const existingUser = await userSchema.findOne({ username });

    if (existingUser) {
      return res.status(400).send({ message: message.signup.existinguser });
    };

    const userData = {
      username,
      password,
      role: roles.admin,
    };
    
    const salt = await bcrypt.genSalt();
    userData.password = await bcrypt.hash(password, salt);
    
    await userSchema.create(userData);

    return res.status(200).send({ message: message.signup.success });

  } catch (error) {
    return res.status(500).send({ message: message.signup.failure });
  }

});

module.exports = router;