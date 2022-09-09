import { gql } from '@apollo/client';

export const GET_ALL_SUBSEENITS_WITH_SEARCH = gql`
    query Myquery($topic: String!) {
        getSubseenitListBySearch(topic: $topic) {
            created_at
            id
            topic
        }
    }
`

export const GET_ALL_VOTES_BY_POST_ID = gql`
    query MyQuery($post_id: ID!) {
        getVotesByPostId(post_id: $post_id) {
            created_at
            id
            post_id
            upvote
            username
        }
    }
`

export const GET_SUBSEENITS_WITH_LIMIT = gql`
    query MyQuery($limit: Int!) {
        getSubseenitListLimit(limit: $limit) {
            created_at
            id
            topic
        }
    }
`

export const GET_POST_BY_POST_ID = gql`
    query myQuery($post_id: ID!) {
        getPostListByPostId(post_id: $post_id) {
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