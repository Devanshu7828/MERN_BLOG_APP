const User = require("../models/usersModel");

exports.signup = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(500).json({ message: "Email alredy exists" });
    }

    const newUser = await User.create(req.body);

    res.status(200).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (error) {
    res.json({ error: error.message });
  }
};

exports.signin = async (req, res) => {
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

  res.status(200).json({ message: "Logged in successfully" });
};
