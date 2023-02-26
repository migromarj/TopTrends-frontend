import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import { gql, useQuery } from '@apollo/client'
import { Pie } from 'react-chartjs-2'

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

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error</p>

	Chart.register(CategoryScale)

	const graphData = {
		labels: data.wordRelatedTopics.map(
			topic => topic.topicTitle + ' (' + topic.topicType + ')'
		),
		datasets: [
			{
				label: 'Word Topics',
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

	return (
		<div className='w-full lg:w-80'>
			<h1 className='my-2 text-center text-xl font-bold'>{props.title}</h1>
			<Pie data={graphData} />
		</div>
	)
}
