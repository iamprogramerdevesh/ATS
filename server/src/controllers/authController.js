import UserInfo from "../models/userInfo.js";
import bcrypt from "bcrypt";
import { validationResult } from 'express-validator';
import { createTokenOptions } from "../helpers/cookies.js";
import generateTokens from "../helpers/token.js";
import generateUniqueId from "../helpers/commFuncHelper.js";

/* Register User */
export const signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        const { Username, Email, Password } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(Password, salt);
        const UniqueId = generateUniqueId();

        const newUser = new UserInfo({
            UniqueId,
            Username,
            Email,
            Password: passwordHash
        });

        const user = await newUser.save();
        const userId = user._id;

        await UserInfo.findOneAndUpdate(
            { _id: userId }, // Find the user by ID
            { CreatedBy: userId } // Update createdBy
        );

        res.status(201).json({
            success: true,
            message: "Signup Successfully.",
            userId
        });
    }
};

/* User Login */
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    else {
        const { Username, Password, IsRemember = true } = req.body;

        const user = await UserInfo.findOne({ Username });
        if (!user) return res.status(400).json({ success: false, message: "Username doesn't exist." });

        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect Password." });

        const { authToken } = await generateTokens(user);

        let lastlogin = new Date();
        await UserInfo.findOneAndUpdate(
            { _id: user._id }, // Find the user by ID
            { LastLogIn: lastlogin, token: authToken },
        );

        const token = `Bearer ${authToken}`;
        
        res.cookie('token', token, {
            ...createTokenOptions(),
            maxAge: 7 * 24 * 60 * 60 * 1000 //Expire in 7 days
        });

        res.status(200).json({
            success: true,
            message: "Login Successfully."
        });
    }
};

/* LOGGING OUT */
export const handleLogout = async (req, res) => {
    const { UserId } = req.body;

    await UserInfo.findOneAndUpdate(
        { _id: UserId }, // Find the user by ID
        { token: null },
    );

    res.clearCookie('token', createTokenOptions());
    res.status(200).json({
        success: true,
        message: "Logout Successfully!!!",
    });
}