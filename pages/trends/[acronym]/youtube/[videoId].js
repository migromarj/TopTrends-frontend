import { useRouter } from 'next/router'
import { gql, useQuery } from '@apollo/client'
import Title from '../../../../components/Title.jsx'
import Loading from '../../../../components/Loading.jsx'
import Error from '../../../../components/Error.jsx'
import Footer from '../../../../components/Footer.jsx'
import Country404 from '../../../../components/Country404.jsx'
import Head from 'next/head.js'
import YouTubeEmotion from '../../../../components/YouTubeEmotion.jsx'

import dynamic from 'next/dynamic'

const Earth = dynamic(() => import('../../../../components/Earth.jsx'), {
	ssr: false,
})
//import Earth from '../../../../components/Earth.jsx'

export default function WordTrends() {
	const router = useRouter()
	const { acronym } = router.query
	const { videoId } = router.query

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
		const countryName = data.allCountries[0].name
		const flag = data.allCountries[0].flag
		const lat = data.allCountries[0].lat
		const lng = data.allCountries[0].lng

		return (
			<div>
				<Head>
					<title>TopTrends | {countryName}</title>
				</Head>
				<main>
					<div>
						<div className='fixed'>
							<Earth autoFocus lat={lat} lng={lng} />
						</div>
						<div className='absolute w-full'>
							<Title name={countryName} flag={flag} code={acronym} />
							<YouTubeEmotion videoId={videoId} />
							<Footer />
						</div>
					</div>
				</main>
			</div>
		)
	}
}
