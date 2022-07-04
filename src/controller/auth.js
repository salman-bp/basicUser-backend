const User = require("../model/user");
const bcrypt = require("bcrypt");
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        error: "User already registered",
      });

    const { name, email, password, contactNumber } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash_password = bcrypt.hashSync(password, salt);
    console.log("hash_password", hash_password);
    const _user = new User({
      name,
      email,
      hash_password,
      contactNumber,
    });

    _user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
          error,
        });
      }
      if (user) {
        return res.status(201).json({
          msg: "user Registered Successfully...",
          user,
        });
      }

      //   if (user) {
      //     const token = generateJwtToken(user._id, user.role);
      //     const { _id, firstName, lastName, email, role, fullName } = user;
      //     return res.status(201).json({
      //       token,
      //       user: { _id, firstName, lastName, email, role, fullName },
      //     });
      //   }
    });
  });
};
exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).exec(async (error, user) => {
    if (user) {
      const isPassword = await user.authenticate(password);
      console.log("isPassword", isPassword);
      if (isPassword) {
        res.status(200).json({
          msg: "signin successfully...",
        });
      } else {
        res.status(400).json({
          msg: "incorrect passsword...",
        });
      }
    } else {
      res.status(400).json({
        msg: "user not found",
      });
    }
  });
};
exports.updateUser = (req, res) => {
  const { _id, name, contactNumber } = req.body;
  User.findOne({ _id: _id }).exec(async (error, user) => {
    if (user) {
      const updatedUser = await User.findOneAndUpdate(
        { _id },
        {
          name,
          contactNumber,
        },
        { runValidators: true }
      );
      return res.status(202).json({
        msg: "Update User Succesfully..",
        updatedUser,
      });
    } else {
      return res.status(400).json({
        msg: "user Not register",
      });
    }
  });
};
