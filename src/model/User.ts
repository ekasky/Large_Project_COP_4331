import { Document, Schema, model } from "mongoose";

// Interface representing a User document in MongoDB
export interface UserDocument extends Document {

    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    lastLogin: Date;
    emailVerified: boolean;
    loginAttempts: number;
    accountLocked: boolean;

};

// Create the User Schema
const userSchema = new Schema<UserDocument>({

    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    lastLogin: {
        type: Date,
        default: null
    },

    emailVerified: {
        type: Boolean,
        default: false
    },

    loginAttempts: {
        type: Number,
        default: 0
    },

    accountLocked: {
        type: Boolean,
        default: false
    }

});

// Create and export the User model
export const User = model<UserDocument>('User', userSchema);