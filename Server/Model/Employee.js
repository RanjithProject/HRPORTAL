const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
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
        enum: ['pending', 'approved', 'none',"reject"],
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
if (mongoose.modelNames().includes('Employee')) {
  User = mongoose.model('Employee');
} else {
  User = mongoose.model('Employee', userSchema);
}

module.exports = User;
