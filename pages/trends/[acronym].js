import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import Title from '../../components/Title.jsx'
import TrendsContainer from '../../components/TrendsContainer.jsx'

export default function Country() {
	const router = useRouter()
	const { acronym } = router.query

	const GET_SPECIFIC_COUNTRY = gql`
		query GetSpecificCountry($acronym: String) {
			allCountries(acronym: $acronym) {
				name
				flag
				woeid
				pn
			}
		}
	`

	const { data, loading, error } = useQuery(GET_SPECIFIC_COUNTRY, {
		variables: { acronym },
	})

	if (loading) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		)
	}

	if (error) {
		return (
			<div>
				<h1>Error</h1>
			</div>
		)
	}
	if (data) {
		if (data.allCountries.length === 0) {
			return (
				<div>
					<h1>Country not found</h1>
				</div>
			)
		}
		const name = data.allCountries[0].name
		const flag = data.allCountries[0].flag
		const woeid = data.allCountries[0].woeid
		const pn = data.allCountries[0].pn
		return (
			<div>
				<Title name={name} flag={flag} />

				<div className='mt-4 flex justify-around'>
					{woeid && <TwitterTrends name={name} />}
					{pn && <GoogleTrends name={name} />}
				</div>
			</div>
		)
	}
}

function TwitterTrends(props) {
	const GET_COUNTRY_TWITTER_TRENDS = gql`
		query GetCountryTwitterTrends($country: String!, $trendsNumber: Int!) {
			countryTwitterTrends(country: $country, trendsNumber: $trendsNumber) {
				id
				name
			}
		}
	`

	const { data, loading, error } = useQuery(GET_COUNTRY_TWITTER_TRENDS, {
		variables: { country: props.name, trendsNumber: 10 },
	})

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error</p>

	return <TrendsContainer name='Twitter' trends={data.countryTwitterTrends} />
}

function GoogleTrends(props) {
	const GET_COUNTRY_GOOGLE_TRENDS = gql`
		query GetCountryGoogleTrends($country: String!, $trendsNumber: Int!) {
			countryGoogleTrends(country: $country, trendsNumber: $trendsNumber) {
				id
				name
			}
		}
	`

	const { data, loading, error } = useQuery(GET_COUNTRY_GOOGLE_TRENDS, {
		variables: { country: props.name, trendsNumber: 10 },
	})

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error</p>

	return <TrendsContainer name='Google' trends={data.countryGoogleTrends} />
}
