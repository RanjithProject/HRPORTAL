// // const mongoose = require('mongoose');

// // const userSchema = new mongoose.Schema({
// //   username: {
// //     type: String,
// //     required: [true, 'Please provide a username'],
// //     unique: true,
// //   },

// //   // This will store the login/sign-out history of the user
// //   worktimestamp: [
// //     {
// //       action: {
// //         type: String,
// //         enum: ['Sign In', 'Sign Out'],
// //         required: true,
// //       },
// //       timestamp: {
// //         type: Date,
// //         default: Date.now,
// //       },
// //       // This will store the break status for each login session
// //       breaktimestamp: [
// //         {
// //           status: {
// //             type: String,
// //             enum: ['Break In', 'Break Out'], // Only "Break In" or "Break Out" allowed
// //             required: true,
// //           },
// //           timestamp: {
// //             type: Date,
// //             default: Date.now,
// //           },
// //         },
// //       ],
// //     },
// //   ],
// // });

// // let User;
// // if (mongoose.modelNames().includes('User')) {
// //   User = mongoose.model('User');
// // } else {
// //   User = mongoose.model('User', userSchema);
// // }

// // module.exports = User;







// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, 'Please provide a username'],
//     unique: true,
//   },


//   worktimestamp: [
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
     
//       breaktimestamp: [
//         {
//           status: {
//             type: String,
//             enum: ['Break In', 'Break Out'], 
//             required: true,
//           },
//           timestamp: {
//             type: Date,
//             default: Date.now,
//           },
//         },
//       ],
//     },
//   ],
// });

// let User;
// if (mongoose.modelNames().includes('User')) {
//   User = mongoose.model('User');
// } else {
//   User = mongoose.model('User', userSchema);
// }

// module.exports = User;



const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },

  // Store work-related timestamps like Sign In, Sign Out, and Break In/Out
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

      // Break-in/break-out timestamps
      breaktimestamp: [
        {
          status: {
            type: String,
            enum: ['Break In', 'Break Out'],
            required: true,
          },
          timestamp: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    },
  ],

  // New field to store leave details
  leave: [
    {
      leaveType: {
        type: String,
        required: [true, 'Please specify the leave type'],
        enum: ['Personal Reason', 'Sick Leave', 'Vacation', 'Other'],
      },
      fromDate: {
        type: Date,
        required: [true, 'Please provide the leave start date'],
      },
      toDate: {
        type: Date,
        required: [true, 'Please provide the leave end date'],
      },
      reason: {
        type: String,
        required: [true, 'Please provide a reason for the leave'],
      },
      leaveStatus: {
        type: String,
        enum: ['pending', 'approved', 'none'],
        default: 'none', 
      },
      appliedAt: {
        type: Date,
        default: Date.now, 
      },
    },
  ],
});

// Check if 'User' model already exists before creating it
let User;
if (mongoose.modelNames().includes('User')) {
  User = mongoose.model('User');
} else {
  User = mongoose.model('User', userSchema);
}

module.exports = User;
