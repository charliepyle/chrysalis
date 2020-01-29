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

const QUERY_IMAGES = gql`
    query userImages($userId: ID!) {
        userImages(userId:$userId) {
            url
        }
    }
`;

module.exports = {
    QUERY_USER,
    QUERY_IMAGES
}