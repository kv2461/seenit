import { gql } from '@apollo/client';

export const GET_SUBSEENIT_BY_TOPIC = gql`
    query MyQuery($topic: String!) {
        getSubseenitListByTopic(topic: $topic) {
            id
            topic
            created_at
        }
    }
`