// // const mongoose = require("mongoose");

// // // Define the user schema
// // const userSchema = new mongoose.Schema({
// //   username: {
// //     type: String,
// //     required: [true, "Please provide a username"],
// //     unique: true,
// //   },
  
// //   // Add cart array to store login and sign-out history
// //   cart: [
// //     {
// //       action: {
// //         type: String,
// //         enum: ['Sign In', 'Sign Out'],
// //         required: true,
// //         default:"Sign Out"
// //       },
// //       timestamp: {
// //         type: Date,
// //         default: Date.now,
// //       },
// //     },
// //   ],
// // });

// // // Create and export the User model, checking if it already exists
// // let User;
// // if (mongoose.modelNames().includes("User")) {
// //   User = mongoose.model("User");
// // } else {
// //   User = mongoose.model("User", userSchema);
// // }

// // module.exports = User;




// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "Please provide a username"],
//     unique: true,
//   },
  
//   // Add cart array to store login and sign-out history
//   cart: [
//     {
//       action: {
//         type: String,
//         enum: ['Sign In', 'Sign Out'],
//         required: true,
//       },
//       timestamp: {
//         type: Date,
//         default: Date.now,
//       },
//     },
//   ],
// });

// let User;
// if (mongoose.modelNames().includes("User")) {
//   User = mongoose.model("User");
// } else {
//   User = mongoose.model("User", userSchema);
// }

// module.exports = User;


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  
  // Add cart array to store login and sign-out history
  cart: [
    {
      action: {
        type: String,
        enum: ['Sign In', 'Sign Out'],
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

let User;
if (mongoose.modelNames().includes("User")) {
  User = mongoose.model("User");
} else {
  User = mongoose.model("User", userSchema);
}

module.exports = User;
