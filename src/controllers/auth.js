const router = require('express').Router();
const userSchema = require('../models/User');
const { decodeToken } = require('../integrations/jwt');
const { message } = require('../messages');

router.get("/", async(req, res) => {
  try {
    const userToken = req.headers.authorization;
    const decodedToken = await decodeToken(userToken);

    const user = await userSchema.findOne({ _id: decodedToken.data._id });
    if(!user) return res.status(404).send({ logged: false, message: message.user.notfound });
    
    const userData = {
      _id: user._id,
      role: user.role,
      username: user.username,
    };
    
    return res.status(200).send({ logged: true, userData });
    
  } catch (error) {
    return res.status(500).send({ error: message.user.error });
  }
});

module.exports = router;