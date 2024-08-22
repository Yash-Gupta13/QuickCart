import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

//? thi is method for saving any document it will hash the password

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(
    this.password,
    Number(process.env.BCRYPTJS_SALT)
  );
  next();
});

//? this method is for checking the password whether it is wrong or right

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//? for generating the accesstoken

userSchema.methods.generateAccessToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },

    process.env.ACCESSTOKEN_SECRET,

    {
      expiresIn: process.env.ACCESSTOKEN_EXPIRY,
    }
  );
};

//? for generating the refresh token

userSchema.methods.generateRefreshToken = async function () {
  return await jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESHTOKEN_SECRET,
    {
      expiresIn: process.env.REFRESHTOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
