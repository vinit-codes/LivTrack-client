import React, { useState, useEffect } from "react";
import "../styles/profile.css";

const Profile = () => {
  // Assuming the user data is fetched from an API
  const [user, setUser] = useState({
    name: "",
    email: "",
    image: "",
    bio: "",
  });

  useEffect(() => {
    // Simulate fetching data from API
    const fetchedUser = {
      name: "John Doe",
      email: "john.doe@example.com",
      image: "https://via.placeholder.com/150",
      bio: "Health enthusiast. Focused on living a balanced life.",
    };
    setUser(fetchedUser);
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-image-container">
          <img src={user.image} alt="Profile" className="profile-image" />
        </div>
        <div className="profile-details">
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      <div className="profile-bio">
        <h2>Bio</h2>
        <p>{user.bio}</p>
      </div>

      <div className="profile-actions">
        <button className="btn-edit">Edit Profile</button>
        <button className="btn-logout">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
