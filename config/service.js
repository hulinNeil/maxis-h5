const express = require("express");
const path = require("path");
var compression = require("compression");
const app = express();
const port = 3101;
app.use(compression());
app.use(express.static(path.join(__dirname, "../dist")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});
app.listen(port, () => console.log(`app listening at http://localhost:${port}`));
