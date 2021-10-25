const { Schema, model } = require('mongoose');

const UserSchema = new Schema (
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Username is required!'],
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email address is required!'],
      validate: {
        validator: function(email) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        },
        message: email => `${email.value} is not a valid email address!`
      }
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
      setters: true
    },
    id: false
  }
);

// get total count of user's friends
UserSchema.virtual('friendsCount').get(function() {
  return this.friends.length;
});

// UserSchema.virtual('thoughtsPosted', {
//   ref: 'Thought',
//   localField: 'username',
//   foreignField: 'username'
// });

// create the User model using UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;