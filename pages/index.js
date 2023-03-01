import Head from 'next/head'
import Search from '../components/Search'
import dynamic from 'next/dynamic'
const Earth = dynamic(() => import('../components/Earth'), { ssr: false })

export default function Home() {
	return (
		<div>
			<Head>
				<title>Home</title>
			</Head>
			<main>
				<div className='absolute z-20 flex h-screen w-screen items-center justify-center'>
					<Search />
				</div>
				<Earth rotate />
			</main>
		</div>
	)
}
