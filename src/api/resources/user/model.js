const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = {
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
};

const userSchema = new mongoose.Schema(schema, { timestamps: true });

function hashPassword(next) {
  const user = this;

  if (!user.password) {
    throw new Error('Could not save user. Password is required.');
  }

  if (!user.isModified('password')) {
    return next();
  }

  user.password = user.hashPassword(user.password);
  return next();
}

userSchema.pre('save', hashPassword);

userSchema.methods = {
  authenticate(plaintTextPassword) {
    return bcrypt.compareSync(plaintTextPassword, this.password);
  },
  hashPassword(plaintTextPassword) {
    if (!plaintTextPassword) {
      throw new Error('Could not save user');
    }

    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plaintTextPassword, salt);
  }
};

const User = mongoose.model('user', userSchema);

module.exports = {
  User,
  schema
};
