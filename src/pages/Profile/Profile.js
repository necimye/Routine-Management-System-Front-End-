import React, { useState } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import profilePhoto from "../Profile/child.jpg";

function ProfileCard() {
	const [shortName, setShortName] = useState("SRJ");
	const [name, setName] = useState("Suraj Pokhrel");
	const [role, setRole] = useState("Head of Department");
	const [subject, setSubject] = useState(
		"Computer Graphics, Artificial Intelligence, Satellite Communication"
	);
	const [username, setUsername] = useState("suraj@61");
	const [email, setEmail] = useState("pokhrelsuraj1211@gmail.com");
	const [about, setAbout] = useState(
		"I am a part time software engineer as well as part time professor at Pulchowk Campus"
	);

	return (
		<div className="ProfileCard">
			<div className="photograph-part">
				<div className="image-container">
					<img src={profilePhoto} alt="" height="1200px" width="1200px" />
				</div>
			</div>

			<div className="description-part">
				<h2>
					<font /> SRJ
				</h2>
				<br></br>
				<h1>Name</h1>
				<h3>{name}</h3>

				<h1>Role</h1>
				<h3>{role}</h3>

				<h1>Subject</h1>
				<h3>{subject}</h3>

				<h1>Email</h1>
				<h3>{email}</h3>

				<p>About</p>
				<h3>{about}</h3>
			</div>
			<div>
				<Router>
					<Link to="/">
						<button className="btn">Close</button>
					</Link>
				</Router>
			</div>
		</div>
	);
}

export default ProfileCard;
