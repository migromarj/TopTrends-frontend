import { useRouter } from 'next/router'
import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import YouTubePieGraph from '../../../../components/YouTubePieGraph'
import Title from '../../../../components/Title'

export default function YouTubeStaistics() {
	const router = useRouter()
	const { acronym } = router.query

	const [type, setType] = useState('Default')

	const handleChange = e => {
		setType(e.target.value)
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

		return (
			<div className='flex flex-col'>
				<Title name={name} flag={flag} />
				<h1 className='text-center text-3xl font-bold'>YouTube Statistics</h1>
				{dropdownMenu(handleChange)}
				<div>
					<YouTubeGraph name={name} type={type} />
				</div>
			</div>
		)
	}
}

function YouTubeGraph(props) {
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
				viewCount
				likeCount
				commentCount
			}
		}
	`

	const { data, loading, error } = useQuery(GET_COUNTRY_YOUTUBE_TRENDS, {
		variables: { country: props.name, trendType: props.type, trendsNumber: 5 },
	})

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error</p>

	if (data) {
		const staistics = getStaistics(data)

		const titles = staistics[0]
		const viewCounts = staistics[1]
		const likeCounts = staistics[2]
		const commentCounts = staistics[3]

		return (
			<div>
				<div className='flex flex-col items-center justify-around lg:flex-row'>
					<div className='mx-10 flex w-80 flex-col rounded-xl bg-purple-400 p-2'>
						{titles.map((title, index) => {
							return (
								<div key={index} className='m-2 rounded-xl bg-purple-200 p-2'>
									<p>
										#{index + 1} - {title}
									</p>
								</div>
							)
						})}
					</div>
					<div className='mt-5 flex w-96 flex-col lg:w-5/12'>
						<h2 className='text-center text-xl font-bold'>Views counts</h2>
						<YouTubePieGraph
							titles={titles}
							values={viewCounts}
							title='Views'
						/>
					</div>
				</div>
				<div className='flex flex-col items-center justify-around lg:flex-row'>
					<div className='mt-5 flex w-96 flex-col lg:w-5/12'>
						<h2 className='text-center text-xl font-bold'>Likes counts</h2>

						<YouTubePieGraph
							titles={titles}
							values={likeCounts}
							title='Likes'
						/>
					</div>
					<div className='mt-5 flex w-96 flex-col lg:w-5/12'>
						<h2 className='text-center text-xl font-bold'>Comments counts</h2>
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
