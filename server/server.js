const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongodb connection
const mongodb_url = process.env.MONGODB_URL;

mongoose.connect(mongodb_url)
    .then(() => console.log("Mongodb connected successfully!"))
    .catch((err) => console.log(err));
    
// routes
app.use("/api/goals", require("./routes/goalRoutes.js"));
app.use("/api/user", require("./routes/userRoute.js"));

// server
app.listen(4000, () => {
    console.log("serverrunning on port : 4000");
});