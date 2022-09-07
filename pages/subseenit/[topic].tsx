import React from 'react'
import { useRouter } from 'next/router';
import Avatar from '../../components/Avatar';

function Subseenit() {
    const {query: {topic}} = useRouter();
  return (
    <div>
        <div>
            <div>
                <Avatar seed={topic as string} large />
            </div>
            <div>
                <h1>Welcome to the s/{topic} subseenit</h1>
            </div>
        </div>
    </div>
  )
}

export default Subseenit