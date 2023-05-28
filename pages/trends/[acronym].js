import Head from 'next/head'
import { useRouter } from 'next/router'
import Title from '../../components/Title.jsx'
import TrendsContainer from '../../components/TrendsContainer.jsx'
import { useState, useEffect } from 'react'
import Loading from '../../components/Loading.jsx'
import Error from '../../components/Error.jsx'
import Link from 'next/link'
import WebIcon from '../../components/WebIcon.jsx'
import Footer from '../../components/Footer.jsx'
import Country404 from '../../components/Country404.jsx'
import EarthMap from '../../components/EarthMap.jsx'
import {
	useSpecificCountry,
	useCountryTwitterTrends,
	useCountryGoogleTrends,
	useCountryYouTubeTrends,
} from '../../services/services.js'

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
		}, 0)

		return () => {
			clearTimeout(timeoutId)
		}
	}, [])

	const { data, loading, error } = useSpecificCountry(acronym)

	if (loading) {
		return (
			<div>
				<Head>
					<title>TopTrends | Loading</title>
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
					<title>TopTrends | Error</title>
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
		const name = data.allCountries[0].name
		const flag = data.allCountries[0].flag
		const woeid = data.allCountries[0].woeid
		const pn = data.allCountries[0].pn
		const lat = data.allCountries[0].lat
		const lng = data.allCountries[0].lng

		return (
			<div>
				<Head>
					<title>TopTrends | {name}</title>
				</Head>
				<main>
					<div>
						<EarthMap lat={lat} lng={lng}>
							<Title name={name} flag={flag} />
							<div
								className={`mt-4 flex flex-wrap justify-around ${
									visible ? 'block' : 'hidden'
								}`}
							>
								{woeid && <TwitterTrends name={name} acronym={acronym} />}
								{pn && <GoogleTrends name={name} acronym={acronym} />}
								<div className='flex flex-col'>
									<div
										id='YouTube-title-container'
										className='m-3 flex items-center justify-center'
									>
										<WebIcon name='YouTube' />
										<h2
											id='YouTube-title'
											className='text-2xl font-bold text-white'
										>
											YouTube
										</h2>

										<Link
											id='YouTube-more-info'
											href={`/trends/${acronym}/youtube`}
											className='ml-2 rounded-xl bg-purple-800 p-2 text-white'
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
						</EarthMap>
					</div>
				</main>
			</div>
		)
	}
}

function TwitterTrends(props) {
	const { data, loading, error } = useCountryTwitterTrends(props)

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
	const { data, loading, error } = useCountryGoogleTrends(props)

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
	const { data, loading, error } = useCountryYouTubeTrends(props)

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
			id='dropdownYouTube'
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
