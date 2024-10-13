import mongoose from "mongoose";

const UserInfoSchema = new mongoose.Schema(
    {
        UniqueId: {
            type: Number,
            required: true,
            unique: true,
        },
        Username: {
            type: String,
            required: true,
            unique: true,
        },
        Email: {
            type: String,
            required: true,
            unique: true,
        },
        Password: {
            type: String,
            required: true,
            min: 8,
        },
        token: {
            type: String,
            default: null,
        },
        IsAdmin: {
            type: Boolean,
            default: false,
        },
        IsActive: {
            type: Boolean,
            default: true,
        },
        CreatedBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            default: null,
        },
        UpdatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        JoinedOn: {
            type: Date,
            default: Date.now,
        },
        LastLogIn: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

const UserInfo = mongoose.model('UserInfo', UserInfoSchema, 'UserInfo');
export default UserInfo;