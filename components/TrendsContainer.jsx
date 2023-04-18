import Link from 'next/link'
import WebIcon from './WebIcon'

export default function TrendsContainer(props) {
	return (
		<div id={`container-${props.name}`} className='m-3 w-96'>
			{props.name !== 'YouTube' && (
				<div
					id={`${props.name}-title-container`}
					className='flex items-center justify-center'
				>
					<WebIcon name={props.name} />
					<h2
						id={`${props.name}-title`}
						className='text-2xl font-bold text-white'
					>
						{props.name}
					</h2>
				</div>
			)}

			<div
				className={`overflow-auto rounded-xl bg-purple-400 bg-opacity-20 p-3 ${
					props.name === 'YouTube' ? 'h-80 xl:h-100' : 'h-96 xl:h-120'
				}`}
			>
				{props.trends.map((trend, index) => (
					<div
						key={trend.id}
						className='m-1 rounded-xl bg-purple-100 bg-opacity-20 p-2 text-center text-white'
					>
						<Link
							id={`${props.name}-trend-${index + 1}`}
							href={`/trends/${props.acronym}/words/${encodeURIComponent(
								trend.name
							)}`}
						>
							{(props.name === 'Twitter' || props.name === 'Google') && (
								<div className='flex items-center justify-between'>
									<div className='w-full'>
										#{index + 1} - {trend.name}
									</div>
									<div className='text-right'>🖱</div>
								</div>
							)}
						</Link>
						{props.name === 'YouTube' && (
							<div id={`${props.name}-Trend-${index + 1}`}>
								#{index + 1} - {trend.title}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
