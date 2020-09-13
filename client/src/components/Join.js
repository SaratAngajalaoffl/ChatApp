import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import "./Styles/Join.css";

function Join() {
	const [name, setname] = useState("");
	const [room, setroom] = useState("");

	return (
		<div className="join_outer_container">
			<div className="join__inner_container">
				<h1 className="heading">Join the Room</h1>
				<div className="input_group">
					<input
						placeholder="Name"
						type="text"
						className="joinInput"
						onChange={(val) => setname(val.target.value)}
					/>
					<input
						placeholder="Room"
						type="text"
						className="joinInput"
						onChange={(val) => setroom(val.target.value)}
					/>
					<Link
						onClick={(event) =>
							!name || !room ? event.preventDefault() : null
						}
						to={`/chat?name=${name}&room=${room}`}
					>
						<IconButton>
							<button className="joinButton" type="submit">
								Sign in
							</button>
						</IconButton>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Join;
