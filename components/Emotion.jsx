import { gql, useQuery } from '@apollo/client'
import { Doughnut } from 'react-chartjs-2'
import { Audio } from 'react-loader-spinner'

export default function Emotion(props) {
	const GET_TREND_EMOTION = gql`
		query GetTrendEmotions($word: String!) {
			trendEmotions(word: $word) {
				negativeEmotion
				neutralEmotion
				positiveEmotion
			}
		}
	`

	const { data, loading, error } = useQuery(GET_TREND_EMOTION, {
		variables: { word: props.word },
	})

	if (loading)
		return (
			<div className='ml-5 h-20 select-none'>
				<Audio color='#c084fc' />
			</div>
		)
	if (error) return <span />

	if (data) {
		if (data.trendEmotions.length === 0) return <span />
		const negative = data.trendEmotions[0].negativeEmotion
		const neutral = data.trendEmotions[0].neutralEmotion
		const positive = data.trendEmotions[0].positiveEmotion

		const dataGraph = {
			datasets: [
				{
					label: 'Emotion',
					data: [negative, neutral, positive],
					backgroundColor: [
						'rgba(255, 99, 132, 0.5)',
						'rgba(255, 206, 86, 0.5)',
						'rgba(75, 192, 192, 0.5)',
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
					],
					borderWidth: 1,
				},
			],
		}

		const options = { events: [] }

		return (
			<div id='emotion-container' className='ml-5 h-20 select-none'>
				<Doughnut data={dataGraph} options={options} />
			</div>
		)
	}
}
