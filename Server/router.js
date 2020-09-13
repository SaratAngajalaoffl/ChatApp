const express = require("express");

const Router = express.Router();

Router.get("/", (req, res, next) => {
	res.send("Server is up and running");
});

module.exports = Router;
