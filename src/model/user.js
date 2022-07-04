const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      min: [3, "minimum three character"],
      max: [20, "max 20"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      trim: true,
      required: true,
    },
    contactNumber: { type: String },
  },
  { timestamps: true }
);
userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compareSync(password, this.hash_password); // true
  },
};

module.exports = mongoose.model("User", userSchema);
