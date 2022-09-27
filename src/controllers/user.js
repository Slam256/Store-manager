import User from "../models/userModel";
import bcrypt from "bcrypt";
import {
  Roles,
  admin,
  Attendant,
  Store_Admin,
  Store_Owner,
} from "../_helpers/roles";
import jwt from "jsonwebtoken";

class UserController {
  static async initSign(req, res) {
    try {
      const { userName, email, password } = req.body;
      const isFirstUser = (await User.countDocuments({})) === 0;
      if (isFirstUser) {
        let encryptedPassword = await bcrypt.hash(
          password,
          await bcrypt.genSalt(10)
        );
        const oAccount = new User({
          userName,
          email,
          password: encryptedPassword,
        });
        oAccount.roles = Store_Admin;
        const ownerAccount = await User.create(oAccount);
        return res
          .status(201)
          .json({ ownerAccount, message: "Store owner created" });
      } else {
        return res.status(404).json({ error: "UNAUTHORISED contact admin" });
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  static async registerUser(req, res) {
    // validate user is an Admin or store Owner
    const { roles } = req.user;
    if (roles === Attendant)
      return res
        .status(400)
        .json({ error: "you are not authorised to register a user" });

    const { username, email, password, role } = req.body;
    if (!username || !password || !email || !role) {
      res
        .status(400)
        .json({ message: "Username, email, role and password are required" });
    }
    // validate that the user is unique
    const operator = await User.findOne({ email });

    if (operator)
      return res.status(400).json({
        error: "The user you are trying to register already exists",
      });

    if (!Roles.includes(role)) {
      return res.status(400).json({ error: "That is not a valid role" });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const encryptedPassword = await bcrypt.hash(password, salt);
      const newOperator = await User.create({
        username,
        email,
        password: encryptedPassword,
        roles: role,
      });
      const { username, email, password, role, createdAt } = newOperator;

      return res.status(201).json({
        username,
        email,
        createdAt,
        roles,
        password: "************",
      });
    } catch (e) {
      console.log(error);
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
      }
      const user = await User.findOne({ email }).exec();
      if (!user)
        return res.status(400).json({ message: "Invalid crendentials" });

      const confirmPassword = await bcrypt.compare(password, user.password);
      if (!confirmPassword)
        return res.status(400).json({ message: "Invalid crendentials" });

      const token = jwt.sign(
        { id: user._id, role: user.roles },
        process.env.TOKEN_SECRET
      );

      return res
        .status(201)
        .json({
          message: `${email} Logged in successfully`,
        })
        .header(`access-token, ${token}`);
    } catch (e) {
      console.log(e.message);
    }
  }
  // trial trial
  static async logoutUser(req, res) {
    req.logout(() => {
      console.log("user has been logged out");
    });
    req.session.destroy((err) => {
      if (err)
        console.log(
          "Error : Failed to destroy the session during logout.",
          err
        );
      req.user = null;
      res.status(201).json({ message: "User has been logged out" });
    });
  }
}

export default UserController;
