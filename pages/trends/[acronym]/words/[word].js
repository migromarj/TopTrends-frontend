import { useRouter } from 'next/router'
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import WordInterestGraph from '../../../../components/WordInterestGraph.jsx'
import Title from '../../../../components/Title.jsx'

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
			}
		}
	`

	const { data, loading, error } = useQuery(GET_SPECIFIC_COUNTRY, {
		variables: { acronym },
	})

	if (loading) {
		;<h1>Loading...</h1>
	}

	if (error) {
		;<h1>Error</h1>
	}

	if (data) {
		const countryName = data.allCountries[0].name
		const flag = data.allCountries[0].flag

		return (
			<div>
				<Title name={countryName} flag={flag} />
				{dropdownMenu(handleChange)}
				<div className='flex flex-col items-center justify-around lg:flex-row'>
					<WordInterestGraph
						word={word}
						country={countryName}
						period={period}
						title={`${word} ${period} interest`}
					/>
				</div>
			</div>
		)
	}
}

function dropdownMenu(handleChange) {
	return (
		<div className='flex w-screen justify-center'>
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
