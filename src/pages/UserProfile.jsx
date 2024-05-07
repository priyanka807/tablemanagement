import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    photo: null,
  });
  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));

    if (type === "file") {
      setProfileData((prevData) => ({
        ...prevData,
        photo: event.target.files[0],
      }));
    }
  };

  const handleProfileSave = () => {
    console.log("Saving user profile:", profileData);
  };

  return (
    <>
      {/* <Link to="/tablecontent" style={{color:'blue',textDecoration:'none'}}>back to tablecontent page</Link> */}
      <div className="profile-container">
        <Link
          to="/tablecontent"
          style={{ color: "blue", textDecoration: "none" }}
        >
          back to tablecontent page
        </Link>

        <div className="profile-sub-container">

          {profileData.photo && (
            <img
              src={URL.createObjectURL(profileData.photo)}
              alt="Profile"
              className="image_width"
            />
          )}
       
          <div
            style={{
              marginLeft: "200px",
              // marginTop: "6px",
              marginBottom: "10px",
              color: "rgb(26, 106, 255)",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="input-photo"
            />
          </div>

        

            <div className="profile-content  card-body ">
              
            <div className="users col-md-6  mb-3">
              <label className="form-label">First Name:</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"

                value={profileData.firstName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="users col-md-6  mb-3">
              <label className="form-label">Last Name:</label>
              <input
                type="text"
                name="lastName"
                placeholder="Also your last name"

                value={profileData.lastName}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="users col-md-6  mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                value={profileData.email}
                onChange={handleInputChange}
                className="formHover form-control"
              />
            </div>
            <div className="users col-md-6  mb-3">
              <label className="form-label">Phone:</label>
              <input
                type="tel"
                name="phone"
                placeholder="+12-345 678 910"

                value={profileData.phone}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="users col-md-6  mb-3">
              <label className="form-label">Gender:</label>
              <select
                name="gender"
                placeholder="select your gender"

                value={profileData.gender}
                onChange={handleInputChange}
                className="form-control  form-select"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="users col-md-6  mb-3">
              <label className="form-label">Birthday:</label>
              <input
                type="date"
                name="birthday"
                placeholder="select your birthday"

                value={profileData.birthday}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="users col-md-6  mb-3">
              <label className="form-label">Address:</label>
              <input
                type="text"
                name="address"
                placeholder="Enter your home address"

                value={profileData.address}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="users col-md-6  mb-3">
              <label className="form-label">State:</label>
              <input
                type="text"
                name="state"
                placeholder="state"

                value={profileData.state}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="users col-md-6  mb-3">
              <label className="form-label">City:</label>
              <input
                type="text"
                name="city"
                placeholder="city"

                value={profileData.city}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="users col-md-6  mb-3">
              <label className="form-label">ZIP:</label>
              <input
                type="text"
                name="zip"
                placeholder="enter your zip code"

                value={profileData.zip}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <button onClick={handleProfileSave} className="btn btn-primary">
              Save All
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
