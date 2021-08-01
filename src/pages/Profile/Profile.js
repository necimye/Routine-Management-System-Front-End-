import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UserContext } from "../../components/Contexts/UserContext";
import "./Profile.css";

import profilePhoto from "./BibhaSthapit.jpg";

function ProfileCard() {
  const { user } = useContext(UserContext);
  const [username] = useState(user);

  return (
    <div className="ProfileCard">
      <div className="photograph-part">
        <div className="image-container">
          <img src={profilePhoto} alt="" height="1200px" width="1200px" />
        </div>
      </div>

      <div className="description-part">
        <h1>
          <font color="#ff0000" />
          Name
        </h1>
        <h1>Bibha Sthapit</h1>
        <h1>{username}</h1>
      </div>
    </div>
  );
}

export default ProfileCard;
