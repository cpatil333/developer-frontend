import React from "react";
import "../styles/navbar.css";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../gqloptions/queries";
import { Link } from "react-router-dom";

const Users = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log("Error ", error.message);
  }
  const handleDelete = (id) => {};
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.users?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.fullName}</td>
              <td>{item.email}</td>
              <td>{item.role || "N/A"}</td>
              <td>
                <Link to={`/posts/${item.id}`} className="editbtn">
                  Edit
                </Link>
                <button onClick={handleDelete(item.id)} className="deletebtn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
