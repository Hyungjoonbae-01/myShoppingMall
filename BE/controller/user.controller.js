const User = require("../model/User");
const bcrypt = require("bcryptjs");

const userController = {};

userController.createUser = async (req, res) => {
  try {
    let { email, password, name, level } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      throw new Error("User already exist");
    }
    const salt = await bcrypt.genSaltSync(10);
    password = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password,
      name,
      level: level ? level : "customer",
    });
    await newUser.save();
    return res.status(200).json({ status: "success" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

// userController.login = async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user) {
//       const isMatch = bcrypt.compareSync(password, user.password);
//       if (isMatch) {
//         const token = user.generateToken();
//         return res.status(200).json({ status: "success", user, token });
//       }
//     }
//     throw new Error("Email or password is not correct, please try again!");
//   } catch (error) {
//     res.status(400).json({ status: "fail", message: error.message });
//   }
// };

userController.getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Can not find user.");
    }
    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = userController;
