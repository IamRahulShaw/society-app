const express = require("express");
const router = require("./route/route");
const path = require("path");
require("./db/connect");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(port, () => console.log(`Server is running on ${port}`));
