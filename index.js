require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const build = path.join(__dirname, "client/dist");
app.use(express.static(build));
app.use('/register',require('./routes/register'));
app.use('/subjects',require('./routes/subjects'));
app.use('/student',require('./routes/student'));
app.use('/class',require('./routes/class'));
app.use('/search',require("./routes/search"))
app.listen(process.env.PORT, () => {
  console.log(`Artemis listening on port ${process.env.PORT}`);
});