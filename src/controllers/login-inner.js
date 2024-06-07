const express = require("express");
const router = express.Router();
const { createToken } = require("../integrations/jwt");
const { message } = require("../messages");
const userSchema = require("../models/User");
const bcrypt = require("bcrypt");

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (password !== null && username !== null) {
      const user = await userSchema.findOne({ username });
      if (!user) return res.status(400).send({ error: message.login.notexistinguser });
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const { _id, username, role } = user;
        const dataLogin = { _id, username, role};
        const userToken = await createToken(dataLogin, 3);
        
        return res.status(200).send(userToken);

      } else {
        return res.status(400).send({ error: message.login.credentialsfailure });
      };
    };

    return res.status(400).send({ error: message.login.failure });

  } catch (error) {
    return res.status(400).send({ msg: message.login.failure });
  };
});

module.exports = router;