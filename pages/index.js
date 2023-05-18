import Head from 'next/head'
import Search from '../components/Search'
import NavBar from '../components/NavBar'
import { useCountries } from '../services/services'
import { Blocks } from 'react-loader-spinner'
import dynamic from 'next/dynamic'
const Earth = dynamic(() => import('../components/Earth'), { ssr: false })

export default function Home() {
	const { data } = useCountries()

	return (
		<div>
			<Head>
				<title>TopTrends | Home</title>
			</Head>
			<main>
				<NavBar />
				<div className='absolute z-20 flex h-screen w-screen items-center justify-center'>
					{data && <Search />}
					{!data && (
						<div className='flex flex-row items-center'>
							<div className='text-3xl text-white'>Loading countries</div>
							<Blocks
								height='50'
								width='50'
								ariaLabel='blocks-loading'
								wrapperStyle={{}}
								wrapperClass='blocks-wrapper'
							/>
						</div>
					)}
				</div>
				<Earth rotate />
			</main>
		</div>
	)
}
