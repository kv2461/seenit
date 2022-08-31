import type { NextPage } from 'next'
import Head from 'next/head'
import PostBox from '../components/PostBox';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Seenit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* postbox */}
      <PostBox />

      <div>
        {/* feed */}
      </div>
    </div>
  )
}

export default Home
