import React, { useState } from 'react'
import "../styles/navbar.css";
import { useMutation } from "@apollo/client"
import { UPDATE_PROFILE } from "../gqloptions/mutation";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const nagivate = useNavigate();
  const [formData, setFormData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null)
  const [UserProfile, { data, loading, error }] = useMutation(UPDATE_PROFILE, {
    onCompleted(data) {
      nagivate("/users");
    }
  });

  if (loading) return <p>Loading...</p>
  if (error) {
    console.log(error);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };
  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0])
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    let uploadedFileName = "";

    if (selectedFile) {
      const fileData = new FormData();
      fileData.append("profilePic", selectedFile);
      try {
        const response = await fetch("http://localhost:4000/uploads", {
          method: "POST",
          body: fileData
        });

        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          // only error if it’s *not* JSON
          const text = await response.text();
          throw new Error("Server returned non-JSON: " + text);
        }
        const results = await response.json();
        uploadedFileName = results.filename;
      } catch (error) {
        console.log("uploaded failed ", error.message);
        return;
      }
    }
    UserProfile({
      variables: {
        updateProfile: {
          ...formData,
          profilePic: uploadedFileName
        }
      }
    })
    alert("User profile updated!")
  };

  return (
    <div className="container">
      <div className="loginDiv">
        <form onSubmit={handleSubmit}>
          <h2>User Profile</h2>
          <div>
            <input
              type="text"
              name="bio"
              placeholder="bio"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="skills"
              placeholder="skills"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="file"
              name="profilePic"
              placeholder="Upload Photo"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="github"
              placeholder="Github Link"
              onChange={handleChange}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Profile
