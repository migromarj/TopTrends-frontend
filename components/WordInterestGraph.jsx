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
			<div className='w-5/12'>
				<div className='flex w-full flex-col justify-center'>
					<h1 className='my-2 text-center text-xl font-bold '>
						<span className='text-purple-400'>{props.title} </span>
						<span className='text-white'>interest 📈</span>
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
				label: 'Interest Percentage (%)',
				data: data.wordGoogleTrends.map(trend => trend.value),
				fill: false,
				backgroundColor: 'rgb(192 132 252)',
				borderColor: 'rgba(255, 99, 132, 0.2)',
			},
		],
	}

	const options = {
		plugins: {
			legend: {
				display: false,
			},
		},
		scales: {
			x: {
				title: {
					display: true,
					text: 'Datetime',
					color: 'black',
					font: {
						size: 16,
					},
				},
				ticks: {
					color: 'black',
					font: {
						size: 12,
					},
				},
			},
			y: {
				title: {
					display: true,
					text: 'Interest Percentage',
					color: 'black',
					font: {
						size: 16,
					},
				},
				ticks: {
					callback: function (value) {
						return value + '%'
					},
					color: 'black',
					font: {
						size: 14,
					},
				},
			},
		},
	}

	return (
		<div
			id='interest-container'
			className={`flex w-11/12 flex-col justify-center lg:h-96 ${
				data.wordGoogleTrends.length === 0 ? 'lg:w-1/2' : 'lg:w-7/12'
			}`}
		>
			<h1 id='interest-text' className='my-2 text-center text-xl font-bold '>
				<span className='text-purple-400'>{props.title} </span>
				<span className='text-white'>interest 📈</span>
			</h1>
			{data.wordGoogleTrends.length === 0 && (
				<div className='flex justify-center'>
					<Error />
				</div>
			)}
			{data.wordGoogleTrends.length > 0 && (
				<Line
					id='wordInterestGraph'
					data={graphData}
					options={options}
					className='rounded-xl bg-purple-100'
				/>
			)}
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
