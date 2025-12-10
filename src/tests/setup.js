// src/tests/setup.js
const mongoose = require("mongoose");
const connectDB = require("../config/db");

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
