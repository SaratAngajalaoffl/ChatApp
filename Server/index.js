const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
	socket.on("join", ({ name, room }, callback) => {
		const { error, user } = addUser({ id: socket.id, name, room });

		if (error) {
			callback({ error: "error" });
		}

		socket.emit("message", {
			user: "admin",
			text: `${user.name},welcome to the room ${room.name}`,
		});

		socket.broadcast
			.to(user.room)
			.emit("message", { user: "admin", text: `${user.name},has joined` });

		socket.join(user.room);
	});

	socket.on("sendmessage", (message, callback) => {
		const user = getUser(socket.id);

		io.to(user.room).emit("message", { user: user.name, text: message });

		callback();
	});

	socket.on("disconnect", () => {
		console.log("User Left");
	});
});

const Router = require("./Router");

app.use(Router);

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
