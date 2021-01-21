const express = require("express");
const app = express();

const mongoose = require("mongoose");

// connect to mongo server
mongoose
  .connect("mongodb://localhost/project-6", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.error("FAIL: could not connect to mongo", err));


  app.use(require("morgan")("dev"));
// parse json body in case request's content-type is application/json
app.use(express.json());

app.use(express.static("../client/dist/client"));
// configure routes
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const cardsRouter = require("./routes/cards");
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/cards", cardsRouter);

app.get("*", (req, res) => {
  res.redirect("/");
});
const PORT = 3006;
app.listen(PORT, () => console.log(`click http://localhost:${PORT}`));
