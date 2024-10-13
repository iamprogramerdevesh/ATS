import { body } from 'express-validator';
import UserInfo from "../models/userInfo.js";

//#region Auth Validations
export const registerValidations = [
    body('Username', 'Enter a valid name').isLength({ min: 3 }),
    body('Email', 'Enter a valid email').isEmail(),
    body('Password', 'Password must be atleast 8 characters').isLength({ min: 8 }),
    body('Email').custom(async value => {
        const user = await UserInfo.findOne({Email: value});
        if (user) {
            throw new Error('E-mail already in use');
        }
    }),
    body('UserName').custom(async value => {
        const user = await UserInfo.findOne({UserName: value});
        if (user) {
            throw new Error('Username already in use');
        }
    }),
];

export const loginValidations = [
    body('Username', 'Enter a valid name').isLength({ min: 3 }),
    body('Password', 'Password must be atleast 8 characters').isLength({ min: 8 })
];
//#endregion