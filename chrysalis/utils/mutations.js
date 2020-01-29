import gql from 'graphql-tag'

const ADD_OR_UPDATE_USER = gql`
    mutation createUserMutation($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            id
            firstName
            lastName
        }
    }
`;

const UPLOAD_IMAGE = gql`
    mutation uploadImageMutation($id: ID, $url: String!) {
        createImage(id: $id, url: $url) {
            id
            url
        }
    }
`;

module.exports = {
    ADD_OR_UPDATE_USER,
    UPLOAD_IMAGE
}