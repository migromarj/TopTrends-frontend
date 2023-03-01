import { CategoryScale } from 'chart.js'
import Chart from 'chart.js/auto'
import { Pie } from 'react-chartjs-2'

export default function YouTubePieGraph(props) {
	Chart.register(CategoryScale)

	const graphData = {
		labels: props.titles,
		datasets: [
			{
				label: `${props.title} count`,
				data: props.values,
				fill: false,
				backgroundColor: [
					'rgba(255, 99, 132, 0.7)',
					'rgba(54, 162, 235, 0.7)',
					'rgba(255, 206, 86, 0.7)',
					'rgba(75, 192, 192, 0.7)',
					'rgba(153, 102, 255, 0.7)',
				],
				borderColor: 'rgba(0, 0, 0, 1)',
				hoverOffset: 4,
			},
		],
	}

	return (
		<div>
			<Pie data={graphData} className='rounded-xl bg-purple-100 p-1' />
		</div>
	)
}
