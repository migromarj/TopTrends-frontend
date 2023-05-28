import { useRouter } from 'next/router'
import { useState } from 'react'
import YouTubePieGraph from '../../../../components/YouTubePieGraph'
import Title from '../../../../components/Title'
import Loading from '../../../../components/Loading'
import Error from '../../../../components/Error.jsx'
import Footer from '../../../../components/Footer.jsx'
import Country404 from '../../../../components/Country404'
import YouTubeVideoContainer from '../../../../components/YouTubeVideoContainer'
import Head from 'next/head.js'
import {
	useSpecificCountry,
	useCountryYouTubeTrends,
} from '../../../../services/services'
import Earth from '../../../../components/Earth.jsx'

export default function YouTubeStaistics() {
	const router = useRouter()
	const { acronym } = router.query

	const [type, setType] = useState('Default')

	const handleChange = e => {
		setType(e.target.value)
	}

	const { data, loading, error } = useSpecificCountry(acronym)

	if (loading) {
		return (
			<div>
				<Head>
					<title>TopTrends | Loading | YouTube</title>
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
					<title>TopTrends | Error | YouTube</title>
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

		return (
			<div>
				<Head>
					<title>TopTrends | {name} | YouTube</title>
				</Head>
				<main>
					<div>
						<div className='fixed h-screen w-screen'>
							<Earth />
						</div>
						<div className='absolute flex w-full flex-col'>
							<Title name={name} flag={flag} code={acronym} />
							<h1
								id='statistics-title'
								className='text-center text-3xl font-bold text-white'
							>
								YouTube Statistics 📺
							</h1>
							{dropdownMenu(handleChange)}
							<div>
								<YouTubeGraph name={name} type={type} />
							</div>
							<Footer />
						</div>
					</div>
				</main>
			</div>
		)
	}
}

function YouTubeGraph(props) {
	const { data, loading, error } = useCountryYouTubeTrends(props, 5)

	if (loading) return <Loading />
	if (error) return <Error />

	if (data) {
		const staistics = getStaistics(data)

		const titles = staistics[0]
		const viewCounts = staistics[1]
		const likeCounts = staistics[2]
		const commentCounts = staistics[3]

		return (
			<div id='graphs-container'>
				<YouTubeVideoContainer titles={titles} />
				<div className='flex flex-wrap justify-around'>
					<div id='views-container' className='mt-5 flex flex-col'>
						<h2
							id='views-text'
							className='text-center text-xl font-bold text-white'
						>
							Views 👁️
						</h2>
						<YouTubePieGraph
							titles={titles}
							values={viewCounts}
							title='Views'
						/>
					</div>
					<div id='likes-container' className='mt-5 flex flex-col'>
						<h2
							id='likes-text'
							className='text-center text-xl font-bold text-white'
						>
							Likes 👍
						</h2>

						<YouTubePieGraph
							titles={titles}
							values={likeCounts}
							title='Likes'
						/>
					</div>
					<div id='comments-container' className='mt-5 flex flex-col'>
						<h2
							id='comments-text'
							className='text-center text-xl font-bold text-white'
						>
							Comments 💬
						</h2>
						<YouTubePieGraph
							titles={titles}
							values={commentCounts}
							title='Comments'
						/>
					</div>
				</div>
			</div>
		)
	}
}

function dropdownMenu(handleChange) {
	return (
		<div className='w-max-screen flex justify-center'>
			<select
				id='categories-dropdown'
				className='m-4 flex w-80 rounded-xl bg-purple-200 p-2'
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
		</div>
	)
}

function getStaistics(data) {
	const ls = data.countryYouTubeTrends

	const titles = []
	const viewCounts = []
	const likeCounts = []
	const commentCounts = []

	ls.forEach(trend => {
		titles.push(trend.title)
		viewCounts.push(trend.viewCount)
		likeCounts.push(trend.likeCount)
		commentCounts.push(trend.commentCount)
	})

	return [titles, viewCounts, likeCounts, commentCounts]
}
