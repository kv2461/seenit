import type { NextPage } from 'next'
import Head from 'next/head'
import PostBox from '../components/PostBox';
import Feed from '../components/Feed';

const Home: NextPage = () => {
  return (
    <div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Seenit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* postbox */}
      <PostBox />

      <div className='flex'>
        {/* feed */}
        <Feed />

        <div className='sticky top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md border border-gray-300 bg-white lg:inline'>
          <p>Top Communities</p>

          <div>
          {/* List subseenits */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
