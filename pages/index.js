import Search from '../components/Search.jsx'
import Head from 'next/head'

export default function Home() {
	return (
		<div>
			<Head>
				<title>Home</title>
			</Head>
			<main>
				<div className='flex h-screen w-screen items-center justify-center'>
					<Search />
				</div>
			</main>
		</div>
	)
}
