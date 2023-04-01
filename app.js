const express = require("express");
const app = express();
const taskRoutes = require("./routes/sign");
const mosaRoutes = require("./routes/mosaic");
const SSSRoutes = require("./routes/sss")

const PORT = 5000;
app.use("/api/sign",taskRoutes);
app.use("/api/mosaic",mosaRoutes);
app.use("/api/sss",SSSRoutes)
app.use(express.static("./public"));


app.listen(PORT, console.log("サーバーが起動しました"));