

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: [true, "Please Provide a Username"],
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: [true, "Please Provide an Email"],
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: [true, "Please Provide a Password"],
//     },
//     isVerified: {
//         type: Boolean,
//         default: false,
//     },
//     isAdmin: {
//         type: Boolean,
//         default: false,
//     },
//     forgotPasswordToken: String,
//     forgotPasswordTokenExpiry: Date,
//     verifyToken: String,
//     verifyTokenExpiry: Date,
// });

// let User;
// if (mongoose.modelNames().includes('users')) {
//     User = mongoose.model('users');
// } else {
//     User = mongoose.model('users', userSchema);
// }

// export default User;




import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide an email address"],
        unique: true,
        lowercase: true,  // Ensure email is always stored in lowercase
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

// Create and export the User model, checking if it already exists
let User;
if (mongoose.modelNames().includes("users")) {
    User = mongoose.model("users");
} else {
    User = mongoose.model("users", userSchema);
}

export default User;
