const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

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

    created_at: {
        type: Date,
        required: true
    },

    last_login: {
        type: Date,
        required: true
    },

    email_verified: {
        type: Boolean,
        required: true
    },

    pending_followers: [{

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }

    }],

    followers: [{

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }

    }],

    following: [{

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }

    }],

    public: {
        type: Boolean,
        required: true
    }

});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;