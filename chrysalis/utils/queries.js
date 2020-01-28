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

module.exports = {
    QUERY_USER
}