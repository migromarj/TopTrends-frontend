import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Earth from './Earth'

export default function Country404() {
	return (
		<div>
			<Head>
				<title>TopTrends | Country not found</title>
			</Head>
			<main>
				<div className='absolute z-20 flex h-screen w-full flex-col items-center justify-center'>
					<div id='not-found-container' className='flex flex-row items-center'>
						<Image
							id='error-icon'
							src='/images/error-icon.png'
							alt='Error'
							width={50}
							height={50}
						/>
						<h1
							id='not-found-text'
							className='ml-2 text-3xl font-bold text-white xs:text-4xl md:text-5xl'
						>
							Country not found
						</h1>
					</div>
					<div className='mt-5 flex justify-center'>
						<Link
							href='/'
							id='go-back-button'
							className='m-4 rounded-xl bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-700'
						>
							Go home
						</Link>
					</div>
				</div>
				<Earth footer />
			</main>
		</div>
	)
}
