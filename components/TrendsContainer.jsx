import Image from 'next/image'
import Link from 'next/link'

export default function TrendsContainer(props) {
	return (
		<div className='m-3 w-96'>
			<div className='flex items-center justify-center'>
				{webIcon(props.name)}
				<h2 className='text-2xl font-bold'>{props.name}</h2>
				{props.name === 'YouTube' && (
					<Link
						href={`/trends/${props.acronym}/youtube`}
						className='ml-2 text-blue-500'
					>
						More info
					</Link>
				)}
			</div>
			<div className='rounded-xl bg-purple-400 bg-opacity-20 p-3'>
				{props.trends.map((trend, index) => (
					<div
						key={trend.id}
						className='m-1 rounded-xl bg-purple-100 bg-opacity-20 p-2 text-center'
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

function webIcon(name) {
	if (name === 'Twitter') {
		return (
			<Image
				src='/../public/images/twitter-icon.png'
				alt='Twitter Icon'
				width={25}
				height={25}
				className='m-1'
			/>
		)
	} else if (name === 'Google') {
		return (
			<Image
				src='/../public/images/google-icon.png'
				alt='Google Icon'
				width={25}
				height={25}
				className='m-1'
			/>
		)
	} else if (name === 'YouTube') {
		return (
			<Image
				src='/../public/images/youtube-icon.png'
				alt='YouTube Icon'
				width={25}
				height={25}
				className='m-1'
			/>
		)
	}
}

function parseTrendName(name) {
	const firstCharacter = name[0]

	if (firstCharacter === '#') {
		const parsedName = name.substring(1).replace(/([A-Z])/g, ' $1')

		return parsedName.trim()
	}

	return name
}
