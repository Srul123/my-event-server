const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));


/*  CORS ORIGIN */
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5000"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to my-event server API" });
});

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/guests", require("./routes/guests"));
app.use("/api/groups", require("./routes/groups"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
