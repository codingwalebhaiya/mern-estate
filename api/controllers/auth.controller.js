import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  // hashed user password by bcryptjs which will save in database
  // const hashedPassword = await bcryptjs.hash(password,10);
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // create a new user
  const newUser = new User({ username, email, password: hashedPassword });

  // user validation check
  try {
    // then save newUser in mongodb database
    await newUser.save();
    // send response
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));

    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET_KEY
    );

    const { password: databasePassword, ...rest } = validUser._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
      const { password: databasePassword, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY);
      const {password:databasePassword, ...rest} = newUser._doc;
      res.cookie('access_token', token, {httpOnly:true}).status(200).json(rest);

    }
  } catch (error) {
    next(error);
  }
}; 

const signout = async (req,res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out successfully!')
  } catch (error) {
    next(error)
  }
}

export { signup, signin, google, signout };
