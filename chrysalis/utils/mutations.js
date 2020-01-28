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

module.exports = {
    ADD_OR_UPDATE_USER
}