import { useRouter } from 'next/router'
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import WordInterestGraph from '../../../../components/WordInterestGraph.jsx'
import WordTopicsGraph from '../../../../components/WordTopicsGraph.jsx'
import Title from '../../../../components/Title.jsx'
import Earth from '../../../../components/Earth.jsx'
import Loading from '../../../../components/Loading.jsx'
import Error from '../../../../components/Error.jsx'
import Footer from '../../../../components/Footer.jsx'
import Country404 from '../../../../components/Country404.jsx'
import Head from 'next/head.js'

export default function WordTrends() {
	const router = useRouter()
	const { acronym } = router.query
	const { word } = router.query

	const [period, setPeriod] = useState('daily')

	const handleChange = e => {
		setPeriod(e.target.value)
	}

	const GET_SPECIFIC_COUNTRY = gql`
		query GetSpecificCountry($acronym: String) {
			allCountries(acronym: $acronym) {
				name
				flag
				lat
				lng
			}
		}
	`

	const { data, loading, error } = useQuery(GET_SPECIFIC_COUNTRY, {
		variables: { acronym },
	})

	if (loading) {
		return (
			<div>
				<Head>
					<title>TopTrends | Error | {word}</title>
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
		const lat = data.allCountries[0].lat
		const lng = data.allCountries[0].lng

		return (
			<div>
				<Head>
					<title>
						TopTrends | {countryName} | {word}
					</title>
				</Head>
				<main>
					<div>
						<div className='fixed'>
							<Earth autoFocus lat={lat} lng={lng} />
						</div>
						<div className='absolute w-full'>
							<Title name={countryName} flag={flag} code={acronym} />
							{dropdownMenu(handleChange)}
							<div className='flex flex-col items-center justify-around lg:flex-row'>
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
		<div className='flex w-full justify-center'>
			<select
				className='my-5 rounded-xl bg-purple-200 p-3'
				onChange={handleChange}
			>
				<option value='daily'>Daily</option>
				<option value='weekly'>Weekly</option>
				<option value='monthly'>Monthly</option>
			</select>
		</div>
	)
}
