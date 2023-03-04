import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import Title from '../../components/Title.jsx'
import TrendsContainer from '../../components/TrendsContainer.jsx'
import { useState, useEffect } from 'react'
import Earth from '../../components/Earth.jsx'
import Loading from '../../components/Loading.jsx'
import Error from '../../components/Error.jsx'
import Link from 'next/link'
import WebIcon from '../../components/WebIcon.jsx'
import Footer from '../../components/Footer.jsx'

export default function Country() {
	const router = useRouter()
	const { acronym } = router.query

	const [type, setType] = useState('Default')

	const handleChange = e => {
		setType(e.target.value)
	}

	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setVisible(true)
		}, 3000)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [])

	const GET_SPECIFIC_COUNTRY = gql`
		query GetSpecificCountry($acronym: String) {
			allCountries(acronym: $acronym) {
				name
				flag
				woeid
				pn
				lat
				lng
			}
		}
	`

	const { data, loading, error } = useQuery(GET_SPECIFIC_COUNTRY, {
		variables: { acronym },
	})

	if (loading) {
		return <Loading background />
	}

	if (error) {
		return <Error background />
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
		const lat = data.allCountries[0].lat
		const lng = data.allCountries[0].lng

		return (
			<div>
				<div className='fixed'>
					<Earth autoFocus lat={lat} lng={lng} />
				</div>
				<div className='absolute w-full'>
					<Title name={name} flag={flag} />

					<div
						className={`mt-4 flex flex-wrap justify-around ${
							visible ? 'block' : 'hidden'
						}`}
					>
						{woeid && <TwitterTrends name={name} acronym={acronym} />}
						{pn && <GoogleTrends name={name} acronym={acronym} />}
						<div className='flex flex-col'>
							<div className='m-3 flex items-center justify-center'>
								<WebIcon name='YouTube' />
								<h2 className='text-2xl font-bold text-white'>YouTube</h2>

								<Link
									href={`/trends/${acronym}/youtube`}
									className='ml-2 text-blue-500'
								>
									More info
								</Link>
							</div>
							{dropdownMenu(handleChange)}
							<YouTubeTrends name={name} acronym={acronym} type={type} />
						</div>
					</div>
					<div className={`${visible ? 'block' : 'hidden'}`}>
						<Footer />
					</div>
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

	if (loading) return <Loading container name='Twitter' />
	if (error) return <Error container name='Twitter' />
	return (
		<TrendsContainer
			name='Twitter'
			acronym={props.acronym}
			trends={data.countryTwitterTrends}
		/>
	)
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

	if (loading) return <Loading container name='Google' />
	if (error) return <Error container name='Google' />

	return (
		<TrendsContainer
			name='Google'
			acronym={props.acronym}
			trends={data.countryGoogleTrends}
		/>
	)
}

function YouTubeTrends(props) {
	const GET_COUNTRY_YOUTUBE_TRENDS = gql`
		query GetCountryYouTubeTrends(
			$country: String!
			$trendType: String!
			$trendsNumber: Int!
		) {
			countryYouTubeTrends(
				country: $country
				trendType: $trendType
				trendsNumber: $trendsNumber
			) {
				id
				title
				thumbnail
			}
		}
	`

	const { data, loading, error } = useQuery(GET_COUNTRY_YOUTUBE_TRENDS, {
		variables: { country: props.name, trendType: props.type, trendsNumber: 10 },
	})

	if (loading) return <Loading container />
	if (error) return <Error container />

	return (
		<TrendsContainer
			name='YouTube'
			acronym={props.acronym}
			trends={data.countryYouTubeTrends}
		/>
	)
}

function dropdownMenu(handleChange) {
	return (
		<select
			className='mx-3 my-2 rounded-xl bg-purple-200 p-1'
			onChange={handleChange}
		>
			<option value='Default'>Default</option>
			<option value='Film & Animation'>Film & Animation</option>
			<option value='Music'>Music</option>
			<option value='Sports'>Sports</option>
			<option value='Gaming'>Gaming</option>
			<option value='Entertainment'>Entertainment</option>
			<option value='News & Politics'>News & Politics</option>
			<option value='Science & Technology'>Science & Technology</option>
		</select>
	)
}
