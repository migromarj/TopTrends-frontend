import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import { gql, useQuery } from '@apollo/client'
import { Line } from 'react-chartjs-2'

export default function WordInterestGraph(props) {
	const GET_WORD_INTEREST = gql`
		query GetWordInterest(
			$word: String!
			$country: String!
			$periodType: String!
		) {
			wordGoogleTrends(
				word: $word
				country: $country
				periodType: $periodType
			) {
				id
				trendDatetime
				value
			}
		}
	`

	const { data, loading, error } = useQuery(GET_WORD_INTEREST, {
		variables: {
			word: props.word,
			country: props.country,
			periodType: props.period,
		},
	})

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error</p>

	Chart.register(CategoryScale)

	const graphData = {
		labels: data.wordGoogleTrends.map(trend => parseDate(trend.trendDatetime)),
		datasets: [
			{
				label: 'Word Interest',
				data: data.wordGoogleTrends.map(trend => trend.value),
				fill: false,
				backgroundColor: 'rgb(255, 99, 132)',
				borderColor: 'rgba(255, 99, 132, 0.2)',
			},
		],
	}

	return (
		<div className='w-full lg:w-7/12'>
			<h1 className='my-2 text-center text-xl font-bold'>{props.title}</h1>
			<Line data={graphData} />
		</div>
	)
}

function parseDate(datetime) {
	const date = datetime.split('T')
	const fullDate = date[0].split('-')
	const time = date[1].split('+')
	const hour = parseInt(time[0].split(':')) + 1
	const minutes = time[0].split(':')[1]

	return (
		fullDate[2] +
		'/' +
		fullDate[1] +
		'/' +
		fullDate[0] +
		' ' +
		hour +
		':' +
		minutes
	)
}