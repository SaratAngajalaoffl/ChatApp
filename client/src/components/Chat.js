import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import querystring from "query-string";
import "./Styles/Chat.css";

let socket;

function Chat({ location }) {
	const [name, setname] = useState("");
	const [room, setroom] = useState("");
	const [messages, setmessages] = useState([]);
	const [message, setmessage] = useState("");
	const baseURL = "localhost:5000";

	useEffect(() => {
		const { name, room } = querystring.parse(location.search);

		socket = io(baseURL);

		setname(name);
		setroom(room);

		socket.emit(
			"join",
			{
				name: name,
				room: room,
			},
			({ error }) => {
				alert(error);
			}
		);

		return () => {
			socket.emit("disconnect");

			socket.off();
		};
	}, [baseURL, location.search]);

	useEffect(() => {
		socket.on("message", (message) => {
			setmessages([...messages, message]);
		});
	}, [messages]);

	console.log(name, room);

	return (
		<div className="chat_outer_container">Hi this is the Chat component</div>
	);
}

export default Chat;
