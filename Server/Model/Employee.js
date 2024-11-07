const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  // Add worktimestamp array to store login and sign-out history
  worktimestamp: [
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
      breaktimestamp:[
        {
          status:{
            type:String,
            enum:["Break In","Sign Out"],
            required:true,
          },
        timestamp:{
          type:Date,
          default:Date.now,
        }
      }
      ]
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
