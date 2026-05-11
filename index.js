// // const express = require("express");
// // const bodyParser = require("body-parser");
// // const path = require("path");
// // const app = express();

// // // connection import
// // const conn = require("./connection");

// // // routes import
// // const sliderRoutes = require("./routes/admin/sliderRouter");

// // // middlewares
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(express.static(path.join(__dirname, "public")));
// // app.set("view engine", "ejs");
// // app.set("views", path.join(__dirname, "views"));

// // // route use
// // app.use("/admin/slider", sliderRoutes);

// // // home route
// // app.get("/", (req, res) => {
// //   res.send("<h2>Admin Panel Running...</h2>");
// // });
// // index.js - cleaned and prepared for admin panel



// const express = require('express');
// const bodyParser = require('body-parser');
// const fileUpload = require('express-fileupload');
// const session = require('express-session');
// const path = require('path');

// const adminRouter = require('./routes/admin');

// const app = express();

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // middlewares
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(fileUpload());
// app.use(
//     session({ secret: 'acbsc31243', resave: true, saveUninitialized: true })
// );

// // static files
// app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
// app.use(express.static(path.join(__dirname, 'public')));

// // mount routers
// app.use('/admin', adminRouter);

// // basic home route
// app.get('/', (req, res) => {
//     res.send(
//         '<h2>Site running</h2><p><a href="/admin">Open Admin Panel</a></p>'
//     );
// });

// // start
// const PORT = process.env.PORT || 1000;
// app.listen(PORT, () => {
//     console.log(`Server started: http://localhost:${PORT}`);
// });



// // index.js
// const express = require("express");
// const fileUpload = require("express-fileupload");
// const path = require("path");
// const cors = require("cors");
// const dotenv = require("dotenv");

// // Load environment variables
// dotenv.config();

// const adminRouter = require("./routes/admin");

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Enable CORS (optional)
// app.use(cors());

// // Body parser
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // File upload middleware
// app.use(fileUpload());

// // Static folder for CSS, images, uploads
// app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));
// app.use(express.static(path.join(__dirname, "public")));

// // EJS setup
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // Root route redirects to /admin
// app.get("/", (req, res) => {
//   res.redirect("/admin");
// });

// // Admin routes
// app.use("/admin", adminRouter);

// // Start server
// app.listen(PORT, () => {
//   console.log(`Admin Panel Running on http://localhost:${PORT}`);
// });



const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
require('dotenv').config();
const cors = require("cors");
const session = require("express-session");

const adminRouter = require("./routes/admin");

const app = express();
const PORT = 3000;

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// session MUST be before routes
app.use(
  session({
    secret: "admin_secret",
    resave: false,
    saveUninitialized: true,
  })
);

// static
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.static(path.join(__dirname, "public")));

// ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// root redirect
app.get("/", (req, res) => {
  res.redirect("/admin/login");
});

// admin routes
app.use("/admin", adminRouter);

// server
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});