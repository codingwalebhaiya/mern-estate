import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

const signup = async (req, res) => {
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

export { signup };
