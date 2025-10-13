import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import { generate_jwt } from "../config/Jwt.js";

export const signup = async (req, res) => {
  if (await User.findOne({ email: req.body.email })) {
    return res.status(400).json({ error: "User Already Exists" });
  }
  const salt = await bcryptjs.genSalt(10);
  const hashpass = await bcryptjs.hash(req.body.password, salt);

  let user = new User({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: hashpass,
    type: req.body.type,
  });
  await user.save();
  return res.json({ message: `${req.body.email} is Successfully Registered` });
};

export const login = async (req, res) => {
  let req_email = req.body.email;
  let req_password = req.body.password;
  if (!req_email || !req_password) {
    return res.status(401).json("Provide Credentials");
  }
  let user = await User.findOne({ email: req_email });
  if (!user) {
    return res.status(401).json("No User Exists. Please Signup");
  }
  if (await bcryptjs.compare(req_password, user.password)) {
    let payload = { user_id: user._id, email: user.email };
    let jwt_token = generate_jwt(payload);
    return res.json({
      status: "Success",
      token: jwt_token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  }else{
    return res.status(401).json({error:"Invalid Credentials"})
  }

  // return res.json("Hello")
};
