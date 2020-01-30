import gql from 'graphql-tag'

const QUERY_USER = gql`
    query queryUser($email: String!) {
        user(email: $email) {
            id
            email
            password
        }
    }
`;

const QUERY_USER_IMAGES = gql`
    query userImages($userId: ID!) {
        userImages(userId:$userId) {
            url
        }
    }
`;

const QUERY_IMAGES = gql`
    query images {
        images {
            url
        }
    }
`;

const QUERY_MEME_IMAGES = gql`
    query images($filter: String) {
        images(filter: $filter) {
            url
        }
    }
`;

const QUERY_CACHED_USER = gql`
  {
    currentUser @client {
      id
      email
      firstName
      lastName
    }
  }
`;

module.exports = {
    QUERY_USER,
    QUERY_USER_IMAGES,
    QUERY_IMAGES,
    QUERY_MEME_IMAGES,
    QUERY_CACHED_USER
}