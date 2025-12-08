import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  favorites: [{ type: String }], 
});

const User = mongoose.model("User", userSchema);

async function seedUsers() {
  try {
    await mongoose.connect("mongodb://localhost:27017/cinesanchika");

    const users = [
      {
        username: "john_doe",
        email: "john@example.com",
        password: "123456",
        favorites: ["Inception", "The Dark Knight", "Interstellar"],
      },
      {
        username: "jane_smith",
        email: "jane@example.com",
        password: "password123",
        favorites: ["Titanic", "Avatar", "The Terminator"],
      },
    ];

    for (let user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    await User.deleteMany({});
    console.log("🗑️ Old users deleted");

    await User.insertMany(users);

    console.log("✅ Users created successfully with hashed passwords!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    mongoose.connection.close();
  }
}

seedUsers();
