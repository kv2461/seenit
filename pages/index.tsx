import type { NextPage } from 'next'
import Head from 'next/head'
import PostBox from '../components/PostBox';
import Feed from '../components/Feed';
import { useQuery } from '@apollo/client';
import { GET_SUBSEENITS_WITH_LIMIT } from '../graphql/queries';
import SubseenitRow from '../components/SubseenitRow';

const Home: NextPage = () => {
  const {data, error} = useQuery(GET_SUBSEENITS_WITH_LIMIT, {
    variables: {
      limit: 10,
    }
  })

  const subseenits: Subseenit[] = data?.getSubseenitListLimit;

  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Seenit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PostBox />

      <div className='flex'>
        <Feed />

        <div className='sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline'>
          <p className='text-md mb-1 p-4 pb-3 font-bold'>Top Communities</p>

          <div>
          {/* List subseenits */}
            {subseenits?.map((subseenit, i) => (
              <SubseenitRow key={subseenit.id} topic={subseenit.topic} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
