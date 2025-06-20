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

export const GET_POSTBY_ID = gql`
query ($postById: ID!) {
  postById(id: $postById) {
    title
    content
    userId
  }
}
`;