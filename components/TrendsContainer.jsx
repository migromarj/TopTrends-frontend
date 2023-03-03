import Link from 'next/link'
import WebIcon from './WebIcon'

export default function TrendsContainer(props) {
	return (
		<div className='m-3 w-96'>
			{props.name !== 'YouTube' && (
				<div className='flex items-center justify-center'>
					<WebIcon name={props.name} />
					<h2 className='text-2xl font-bold text-white'>{props.name}</h2>
				</div>
			)}
			<div className='rounded-xl bg-purple-400 bg-opacity-20 p-3'>
				{props.trends.map((trend, index) => (
					<div
						key={trend.id}
						className='m-1 rounded-xl bg-purple-100 bg-opacity-20 p-2 text-center text-white'
					>
						<Link
							href={`/trends/${props.acronym}/words/${
								typeof trend.name === 'string' ? parseTrendName(trend.name) : ''
							}`}
						>
							{(props.name === 'Twitter' || props.name === 'Google') && (
								<div>
									#{index + 1} - {trend.name}
								</div>
							)}
						</Link>
						{props.name === 'YouTube' && (
							<div>
								#{index + 1} - {trend.title}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

function parseTrendName(name) {
	const firstCharacter = name[0]

	if (firstCharacter === '#') {
		const parsedName = name.substring(1).replace(/([A-Z])/g, ' $1')

		return parsedName.trim()
	}

	return name
}
