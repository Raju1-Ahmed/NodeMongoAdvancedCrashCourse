const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");


const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: validator.isEmail,
        message: "Provide a valid email",
      },
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value, {
            minLength: 6,
            minLowerCase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          });
        },
        message: "Password {VALUE} is not strong enough",
      },
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords don't match",
      },
    },
    role: {
      type: String,
      enum: ["buyer", "strong-manager", "admin"],
      default: "buyer",
    },
    firstName: {
      type: String,
      required: [true, "Please provide a first name"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name is too large"],
    },
    contractNumber: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: "Please provide a valid contract number",
      },
    },
    shippingAddress: String,
    imageURL: {
      type: String,
      validate: {
        validator: validator.isURL,
        message: "Please provide a valid URL",
      },
    },
    status: {
      type: String,
      default: "buyer",
      enum: ["active", "inactive", "blocked"],
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
    const password = this.password;
    const saltRounds = 10; // Number of salt rounds for hashing
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      this.password = hashedPassword;
      this.confirmPassword = undefined;
      next();
    });
  });
  

  userSchema.methods.comparePassword = function (password, hash){
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid
  }


const User = mongoose.model("User", userSchema);
module.exports = User;
