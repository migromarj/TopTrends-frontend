import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import { gql, useQuery } from '@apollo/client'
import { Pie } from 'react-chartjs-2'
import Loading from './Loading'
import Error from './Error'

export default function WordTopicsGraph(props) {
	const GET_WORD_TOPICS = gql`
		query GetWordTopics(
			$word: String!
			$country: String!
			$periodType: String!
			$topicsNumber: Int!
		) {
			wordRelatedTopics(
				word: $word
				country: $country
				periodType: $periodType
				topicsNumber: $topicsNumber
			) {
				id
				topicTitle
				topicType
				value
			}
		}
	`

	const { data, loading, error } = useQuery(GET_WORD_TOPICS, {
		variables: {
			word: props.word,
			country: props.country,
			periodType: props.period,
			topicsNumber: 5,
		},
	})

	if (loading || error) {
		return (
			<div className='w-5/12'>
				<div className='flex w-full flex-col justify-center'>
					<h1 className='my-2 text-center text-xl font-bold '>
						<span className='text-purple-400'>{props.title} </span>
						<span className='text-white'>related topics 🔍</span>
					</h1>
					{loading && <Loading />}
					{error && <Error />}
				</div>
			</div>
		)
	}

	Chart.register(CategoryScale)

	const graphData = {
		labels: data.wordRelatedTopics.map(
			topic => topic.topicTitle + ' (' + topic.topicType + ')'
		),
		datasets: [
			{
				label: 'Relationship with the trend (out of 100)',
				data: data.wordRelatedTopics.map(topic => topic.value),
				fill: false,
				backgroundColor: [
					'rgba(255, 99, 132, 0.7)',
					'rgba(54, 162, 235, 0.7)',
					'rgba(255, 206, 86, 0.7)',
					'rgba(75, 192, 192, 0.7)',
					'rgba(153, 102, 255, 0.7)',
					'rgba(255, 159, 64, 0.7)',
					'rgba(255, 99, 132, 0.7)',
					'rgba(54, 162, 235, 0.7)',
					'rgba(255, 206, 86, 0.7)',
					'rgba(75, 192, 192, 0.7)',
				],
				borderColor: 'rgba(0, 0, 0, 1)',
				hoverOffset: 4,
			},
		],
	}

	const options = {
		plugins: {
			legend: {
				labels: {
					usePointStyle: true,
					color: 'black',
				},
			},
		},
	}

	return (
		<div
			id='topics-container'
			className={`flex w-11/12 flex-col justify-center lg:h-96 ${
				data.wordRelatedTopics.length === 0 ? 'lg:w-1/2' : 'lg:w-4/12'
			}`}
		>
			<h1 id='topics-text' className='my-2 text-center text-xl font-bold'>
				<span className='text-purple-400'>{props.title} </span>
				<span className='text-white'>related topics 🔍</span>
			</h1>
			{data.wordRelatedTopics.length === 0 && (
				<div className='flex justify-center'>
					<Error />
				</div>
			)}
			{data.wordRelatedTopics.length > 0 && (
				<Pie
					id='wordTopicsGraph'
					data={graphData}
					options={options}
					className='max-h-96 rounded-xl bg-purple-100 p-1'
				/>
			)}
		</div>
	)
}
