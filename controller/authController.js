const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(500).json({ message: "Email alredy exists" });
    }

    if (confirmPassword !== password) {
      return res.status(400).json({ message: "Password does not match" });
    }

    const newUser = await User.create(req.body);

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWTSECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result: newUser, token });
  } catch (error) {
    console.log(error);
    res.json({ message: "somethin went wrong" });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // CHECK EMAIL EXIST OR NOT
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Incorect email" });
    }

    const validate = await user.validatePassword(password, user.password);
    if (!validate) {
      return res.status(404).json({ message: "Incorect password" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWTSECRET,
      {
        expiresIn: "1h",
      }
    );


    res.status(200).json({ result: user, token });
  } catch (error) {
    console.log(error);
    res.json({ message: "somethin went wrong" });
  }
};
