import Head from 'next/head'
import Search from '../components/Search'
import NavBar from '../components/NavBar'
import { useCountries } from '../services/services'
import { Blocks } from 'react-loader-spinner'
import Earth from '../components/Earth'

export default function Home() {
	const { data } = useCountries()

	return (
		<div>
			<Head>
				<title>TopTrends | Home</title>
			</Head>
			<main>
				<NavBar />
				<div className='absolute z-20 flex h-screen w-full items-center justify-center'>
					{data && <Search />}
					{!data && (
						<div className='flex flex-row items-center rounded-xl border-2 border-black bg-purple-200 p-4'>
							<div className='text-3xl text-black'>Loading countries</div>
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
				<Earth footer />
			</main>
		</div>
	)
}
