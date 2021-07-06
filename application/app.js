const express = require('express');
const config = require('./foundation/config.json');


//init app
const app = express();

//setup environment
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//routes
app.get("/", (req, res) => { res.send('server created') });

//import routes
const userRoute = require("./app.routes/user.routes");
const postRoute = require("./app.routes/post.routes");
const commentRoute = require("./app.routes/comment.routes");
const likeRoute = require("./app.routes/like.routes");

//create virtual directory && connect imported routes
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);
app.use("/like", likeRoute);


//start server
const PORT = config.Express.port;
app.listen(PORT, () => console.log("Server Running at Port : " + PORT));