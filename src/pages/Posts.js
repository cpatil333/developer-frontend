import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_POST } from "../gqloptions/mutation";
import { GET_USERS, GET_POSTS } from "../gqloptions/queries";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const { data: userData } = useQuery(GET_USERS);
  console.log(userData);
  const [PostInput, { data, loading, error }] = useMutation(ADD_POST, {
    onCompleted(data) {
      navigate("/");
    },
  });

  if (loading) return <p>Loading....</p>;
  if (error) {
    console.log("Error ", error.message);
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PostInput({
      variables: {
        newPost: {
          ...formData,
          userId: parseInt(formData.userId),
        },
        refetchQueries: [{ query: GET_POSTS }]
      },
    });
    alert("Post data saved!");
  };

  return (
    <div className="container">
      <div className="loginDiv">
        <form onSubmit={handleSubmit}>
          <h2>New Post</h2>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="content"
              placeholder="Content"
              onChange={handleChange}
            />
          </div>
          <div>
            <select name="userId" onChange={handleChange} required>
              <option value="0">Select User</option>
              {userData?.users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.fullName}
                </option>
              ))}
            </select>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Posts;
