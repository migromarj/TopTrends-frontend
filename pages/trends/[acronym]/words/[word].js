import { useRouter } from 'next/router'
import { useState } from 'react'
import WordInterestGraph from '../../../../components/WordInterestGraph.jsx'
import WordTopicsGraph from '../../../../components/WordTopicsGraph.jsx'
import Title from '../../../../components/Title.jsx'
import Loading from '../../../../components/Loading.jsx'
import Error from '../../../../components/Error.jsx'
import Footer from '../../../../components/Footer.jsx'
import Country404 from '../../../../components/Country404.jsx'
import Head from 'next/head.js'
import Emotion from '../../../../components/Emotion.jsx'
import { useSpecificCountry } from '../../../../services/services.js'
import Earth from '../../../../components/Earth.jsx'

export default function WordTrends() {
	const router = useRouter()
	const { acronym } = router.query
	const { word } = router.query

	const [period, setPeriod] = useState('daily')

	const handleChange = e => {
		setPeriod(e.target.value)
	}

	const { data, loading, error } = useSpecificCountry(acronym)

	if (loading) {
		return (
			<div>
				<Head>
					<title>TopTrends | Loading | {word}</title>
				</Head>
				<main>
					<Loading background />
				</main>
			</div>
		)
	}

	if (error) {
		return (
			<div>
				<Head>
					<title>TopTrends | Error | {word}</title>
				</Head>
				<main>
					<Error background />
				</main>
			</div>
		)
	}

	if (data) {
		if (data.allCountries.length === 0) {
			return <Country404 />
		}
		const countryName = data.allCountries[0].name
		const flag = data.allCountries[0].flag

		return (
			<div>
				<Head>
					<title>
						TopTrends | {countryName} | {word}
					</title>
				</Head>
				<main>
					<div>
						<div className='fixed h-screen w-screen'>
							<Earth />
						</div>
						<div className='absolute w-full'>
							<Title name={countryName} flag={flag} code={acronym} />
							<h1
								id='statistics-word-title'
								className='mt-5 text-center text-3xl font-bold text-white'
							>
								<span className='text-purple-400'>{word} </span>
								<span className='text-white'>word details 📑</span>
							</h1>
							<div className='flex h-36 items-center justify-center'>
								{dropdownMenu(handleChange)}
							</div>
							<div
								id='word-graphs'
								className='flex flex-col items-center justify-around lg:flex-row'
							>
								<WordInterestGraph
									word={word}
									country={countryName}
									period={period}
									title={`${word}`}
								/>
								<WordTopicsGraph
									word={word}
									country={countryName}
									period={period}
									title={`${word}`}
								/>
							</div>
							<div className='mt-20 mb-10 flex w-full flex-col justify-center'>
								<h1
									id='emotion-title'
									className='my-2 text-center text-2xl font-bold '
								>
									<span className='text-purple-400'>{word} </span>
									<span className='text-white'>emotions 😊</span>
								</h1>
							</div>
							<Emotion word={word} />
							<Footer />
						</div>
					</div>
				</main>
			</div>
		)
	}
}

function dropdownMenu(handleChange) {
	return (
		<select
			id='period-dropdown'
			className='mb-5 h-12 w-36 rounded-xl bg-purple-200 p-3'
			onChange={handleChange}
		>
			<option value='daily'>Daily</option>
			<option value='weekly'>Weekly</option>
			<option value='monthly'>Monthly</option>
		</select>
	)
}
