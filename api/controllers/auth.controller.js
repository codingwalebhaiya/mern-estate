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

    const {password:databasePassword, ...rest } = validUser._doc;


    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);

  } catch (error) {
    next(error);
  }
};

export { signup, signin };
