import { gql } from '@apollo/client';

export const GET_ALL_POSTS = gql`
    query MyQuery {
        getPostList {
            body
            created_at
            id
            image
            title
            subseenit_id
            username
            comments{
                created_at
                id
                post_id
                text
                username
            }
            subseenit {
                created_at
                id
                topic
            }
            votes {
                created_at
                id
                post_id
                upvote
                username
            }
        }
    }
`;

export const GET_ALL_POSTS_BY_TOPIC = gql `
    query MyQuery($topic: String!) {
        getPostListByTopic(topic: $topic) {
            body
            created_at
            id
            image
            title
            subseenit_id
            username
            comments {
                created_at
                id
                post_id
                text
                username
            }
            subseenit {
                created_at
                id
                topic
            }
            votes {
                created_at
                id
                post_id
                upvote
                username
            }
        }
    }
`

export const GET_SUBSEENIT_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getSubseenitListByTopic(topic: $topic) {
            id
            topic
            created_at
        }
    }
`