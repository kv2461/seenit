import { gql } from "@apollo/client";

export const ADD_POST = gql`
    mutation MyMutation(
        $body: String!
        $image: String!
        $subseenit_id: ID!
        $title: String!
        $username: String!
    ) {
        insertPost(
            body: $body
            image: $image
            subseenit_id: $subseenit_id
            title: $title
            username: $username
        ) {
            body
            created_at
            id
            image
            subseenit_id
            title
            username
        }
    }
`

export const ADD_SUBSEENIT = gql `
    mutation MyMutation($topic: String!) {
        insertSubseenit(topic: $topic) {
            id
            topic
            created_at
        }
    }
`