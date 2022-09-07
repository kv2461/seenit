import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
    mutation MyMutation($post_id: ID!, $username: String!, $text: String!) {
        insertComment(post_id: $post_id, text: $text, username: $username) {
            created_at
            id
            post_id
            text
            username
        }
    }
`
//note that this vote doesn't upsert but our logic in the front end uses defensive programming so it doesn't allow for multiple votes per user 
export const ADD_VOTE = gql`
    mutation MyMutation($post_id: ID!, $username: String!, $upvote: Boolean!) {
        insertVote(post_id: $post_id, username: $username, upvote: $upvote) {
            id
            created_at
            post_id
            upvote
            username
        }
    }
`

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

