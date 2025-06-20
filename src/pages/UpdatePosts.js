import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS, GET_POSTS, GET_POSTBY_ID } from "../gqloptions/queries";
import { UPDATE_POST } from "../gqloptions/mutation";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/navbar.css";

const UpdatePosts = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userId: 0,
  });
  const postId = parseInt(params.id);
  const { data: postData } = useQuery(GET_POSTBY_ID, {
    variables: {
      postById: postId,
    },
  });
  const { data: userData } = useQuery(GET_USERS);
  const [UpdatePostInput, { data, loading, error }] = useMutation(UPDATE_POST, {
    onCompleted(data) {
      navigate("/");
    },
  });

  useEffect(() => {
    if (postData?.postById) {
      setFormData({
        title: postData.postById.title,
        content: postData.postById.content,
        userId: postData.postById.userId
      })
    }
  }, [postData])

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
    UpdatePostInput({
      variables: {
        updatePost: {
          ...formData,
          id: parseInt(params.id),
          userId: parseInt(formData.userId),
        },
        refetchQueries: [{ query: GET_POSTS }],
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
              value={formData.title}
              placeholder="Title"
              onChange={handleChange}
            />
          </div>
          <div>
            <textarea
              type="text"
              name="content"
              value={formData.content}
              placeholder="Content"
              onChange={handleChange}
              rows={5}
              cols={5}
            ></textarea>
          </div>
          <div>
            <select name="userId" onChange={handleChange} required
              value={formData.userId}>
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

export default UpdatePosts;
