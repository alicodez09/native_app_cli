const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/auth");
const Jwt = require("jsonwebtoken");
require("dotenv").config();
const { expressjwt: jwt } = require("express-jwt");
// middleware

const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validations
    if (!name) {
      res.send({ message: "Name is required" });
    }
    if (!email) {
      res.send({ message: "Email is required" });
    }
    if (!password) {
      res.send({ message: "Password is required" });
    }

    // Checking the users
    const existingUser = await User.findOne({ email });
    // Existing Users
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User Already registered please login",
      });
    }
    const hashedPassword = await hashPassword(password);
    // Saving the Password
    const data = await new User({
      name,
      email,
      password: hashedPassword,
      assign_password: password,
    }).save();
    res.status(201).send({
      success: true,
      message: "User registered Successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validations
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // Checking the User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    // Encrypting the Password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // !Creating a token(token provides users with access to protected pages and resources for a limited period of time without having to re-enter their username and password.)
    const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    //user find
    const user = await User.findOne({ email });
    //password validate
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be 6 character long",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    //updated useer
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        assign_password: password || user.assign_password,
      },
      { new: true }
    );
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile Updated Please Login",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In User Update Api",
      error,
    });
  }
};
const CheckHashPasswordAPI = async (req, res) => {
  const bcrypt = require("bcrypt");
  const storedHashedPassword = `$2b$10$nO30RqrPJ6ObdXqlnw70Qe.f8Ai8NvqR/8PBm6k99I1i1fYBBez3e`;

  const userProvidedPassword = `tefwddwyd`;

  bcrypt.compare(userProvidedPassword, storedHashedPassword, (err, result) => {
    if (err) {
      console.error("Error comparing passwords:", err);
    } else {
      if (result) {
        return res.status(200).send({
          success: true,
          message: "hashpassword is correct",
        });
      } else {
        return res.status(500).send({
          success: false,
          message: "hashpassword is not correct",
        });
      }
    }
  });
};
module.exports = { Register, Login, UpdateUser, requireSignIn };
