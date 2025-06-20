import { gql } from "@apollo/client";

export const GET_LOGIN = gql`
  mutation ($login: LoginInput!) {
    userLogin(login: $login) {
      token
    }
  }
`;

export const USER_REGISTER = gql`
  mutation ($newRegister: UserRegister!) {
    addRegister(newRegister: $newRegister) {
      id
      fullName
      email
    }
  }
`;

export const ADD_POST = gql`
mutation($newPost: PostInput!){
  addPost(newPost: $newPost) {
    id
    title
    content
  }
}`;

export const UPDATE_PROFILE = gql`
mutation($updateProfile: UserProfile!) {
  updateProfile(updateProfile: $updateProfile) {
    bio
    skills
    profilePic
    github
  }
}`;

export const UPDATE_POST = gql`
mutation($updatePost: UpdatePostInput!){
  updatePost(updatePost: $updatePost) {
   title
   content
   userId
  }
}
`;