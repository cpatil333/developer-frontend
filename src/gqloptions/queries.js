import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      user {
        fullName
      }
    }
  }
`;
export const GET_USERS = gql`
  query {
    users {
      id
      fullName
      email
      role
    }
  }
`;
