import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import { gql, useQuery } from '@apollo/client'
import { Line } from 'react-chartjs-2'
import Loading from './Loading'
import Error from './Error'

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

	Chart.register(CategoryScale)

	if (loading || error) {
		return (
			<div>
				<div className='w-full lg:w-7/12'>
					<h1 className='my-2 text-center text-xl font-bold '>
						<span className='text-purple-400'>{props.title} </span>
						<span className='text-white'>interest</span>
					</h1>
					{loading && <Loading />}
					{error && <Error />}
				</div>
			</div>
		)
	}

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
			<h1 className='my-2 text-center text-xl font-bold '>
				<span className='text-purple-400'>{props.title} </span>
				<span className='text-white'>interest</span>
			</h1>
			<Line data={graphData} className='rounded-xl bg-purple-100' />
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
