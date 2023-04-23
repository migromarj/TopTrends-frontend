import { gql, useQuery } from '@apollo/client'
import { Bar, Pie } from 'react-chartjs-2'
import Loading from './Loading'
import Error from './Error'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

export default function Emotion(props) {
	const GET_TREND_EMOTION = gql`
		query GetTrendEmotions($word: String, $videoId: String) {
			trendEmotions(word: $word, videoId: $videoId) {
				sadnessEmotion
				joyEmotion
				fearEmotion
				angerEmotion
				loveEmotion
				surpriseEmotion
				negativeEmotion
				neutralEmotion
				positiveEmotion
			}
		}
	`

	const { data, loading, error } = useQuery(GET_TREND_EMOTION, {
		variables: { word: props.word, videoId: props.videoId },
	})

	if (loading || error) {
		return (
			<div
				id='emotion-container'
				className='flex flex-col items-center justify-around lg:flex-row'
			>
				<div
					id='emotion-container-1'
					className='flex w-1/2 flex-col justify-center lg:h-96'
				>
					{loading && <Loading />}
					{error && <Error />}
				</div>
				<div
					id='emotion-container-2'
					className='flex w-1/2 flex-col justify-center lg:h-96'
				>
					{loading && <Loading />}
					{error && <Error />}
				</div>
			</div>
		)
	}

	if (data) {
		if (data.trendEmotions.length === 0)
			return (
				<div id='data-not-found'>
					<Error />
				</div>
			)
		const sadness = data.trendEmotions[0].sadnessEmotion
		const joy = data.trendEmotions[0].joyEmotion
		const fear = data.trendEmotions[0].fearEmotion
		const anger = data.trendEmotions[0].angerEmotion
		const love = data.trendEmotions[0].loveEmotion
		const surprise = data.trendEmotions[0].surpriseEmotion
		const negative = data.trendEmotions[0].negativeEmotion
		const neutral = data.trendEmotions[0].neutralEmotion
		const positive = data.trendEmotions[0].positiveEmotion

		const emotionGraph1 = {
			labels: ['Sadness', 'Joy', 'Fear', 'Anger', 'Love', 'Surprise'],
			datasets: [
				{
					label: 'Emotion Percentage (%)',
					data: [sadness, joy, fear, anger, love, surprise].map(value =>
						(value * 100).toFixed(2)
					),
					fill: false,
					backgroundColor: [
						'rgba(255, 99, 132, 0.7)',
						'rgba(255, 206, 86, 0.7)',
						'rgba(75, 192, 192, 0.7)',
						'rgba(54, 162, 235, 0.7)',
						'rgba(153, 102, 255, 0.7)',
						'rgba(255, 159, 64, 0.7)',
					],
					borderColor: 'rgba(0, 0, 0, 1)',
					hoverOffset: 4,
				},
			],
		}

		const optionsGraph1 = {
			plugins: {
				legend: {
					display: false,
				},
			},
			scales: {
				x: {
					title: {
						display: true,
						text: 'Emotion',
						color: 'black',
						font: {
							size: 16,
						},
					},
					ticks: {
						color: 'black',
						font: {
							size: 14,
						},
					},
				},
				y: {
					title: {
						display: true,
						text: 'Percentage',
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
			elements: {
				bar: {
					borderWidth: 2,
				},
			},
		}

		const emotionGraph2 = {
			labels: ['Negative emotion', 'Neutral emotion', 'Positive emotion'],
			datasets: [
				{
					label: 'Emotion Percentage (%)',
					data: [negative, neutral, positive].map(value =>
						(value * 100).toFixed(2)
					),
					fill: false,
					backgroundColor: [
						'rgba(255, 99, 132, 0.7)',
						'rgba(255, 206, 86, 0.7)',
						'rgba(75, 192, 192, 0.7)',
					],
					borderColor: 'rgba(0, 0, 0, 1)',
					hoverOffset: 4,
				},
			],
		}

		const optionsGraph2 = {
			plugins: {
				legend: {
					labels: {
						usePointStyle: true,
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
				id='emotion-container'
				className='flex flex-col items-center justify-around lg:flex-row'
			>
				<div
					id='emotion-container-1'
					className='flex w-11/12 flex-col justify-center lg:h-96 lg:w-7/12'
				>
					<Bar
						id='emotionGraph1'
						data={emotionGraph1}
						options={optionsGraph1}
						className='rounded-xl bg-purple-100'
					/>
				</div>
				<div
					id='emotion-container-2'
					className='mt-10 flex w-11/12 flex-col justify-center lg:mt-0 lg:h-96 lg:w-4/12'
				>
					<Pie
						id='emotionGraph2'
						data={emotionGraph2}
						options={optionsGraph2}
						className='max-h-96 rounded-xl bg-purple-100 p-7'
					/>
				</div>
			</div>
		)
	}
}
