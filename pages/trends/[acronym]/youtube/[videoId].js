import { useRouter } from 'next/router'
import Title from '../../../../components/Title.jsx'
import Footer from '../../../../components/Footer.jsx'
import Country404 from '../../../../components/Country404.jsx'
import Head from 'next/head.js'
import EarthMap from '../../../../components/EarthMap.jsx'
import LoadingError from '../../../../components/LoadingError.jsx'
import YouTubeData from '../../../../components/YouTubeData.jsx'
import { useSpecificCountry } from '../../../../services/services.js'

export default function WordTrends() {
	const router = useRouter()
	const { acronym } = router.query
	const { videoId } = router.query

	const { data, loading, error } = useSpecificCountry(acronym)

	if (loading || error) {
		return <LoadingError loading={loading} error={error} />
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
					<title>TopTrends | {countryName}</title>
				</Head>
				<main>
					<div>
						<EarthMap>
							<Title name={countryName} flag={flag} code={acronym} zIndex />
							<YouTubeData videoId={videoId} />
							<Footer />
						</EarthMap>
					</div>
				</main>
			</div>
		)
	}
}
