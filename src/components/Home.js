import React from "react";
import { GET_POSTS } from "../gqloptions/queries.js";
import { useQuery } from "@apollo/client";
import "../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_POSTS);
  console.log(data);
  if (loading) return <p>Loading....</p>;
  if (error) {
    console.log(error);
    return <p>Error loading posts: {error.message}</p>;
  }

  if (!data?.posts || data.posts.length === 0) {
    return <h2>No Posts data available...</h2>;
  }

  const handleDelete = (id) => { };

  return (
    <div className="container">
      <h2>Posts List</h2>
      <button style={{ width: "125px", float: "right" }}
        onClick={() => navigate("/posts")}
      >Add Post</button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Content</th>
            <th>User Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.posts?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.content}</td>
              <td>{item.user?.fullName || "N/A"}</td>
              <td>
                <Link to={`/posts/${item.id}`} className="editbtn">
                  Edit
                </Link>
                <button onClick={handleDelete(item.id)} className="deletebtn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
