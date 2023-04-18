export default function YouTubeVideoContainer(props) {
	const { titles } = props
	const section1 = titles.slice(0, 3)
	const section2 = titles.slice(3, 5)

	return (
		<div className='flex w-full justify-center'>
			<div className='mx-10 flex w-full max-w-5xl flex-col items-center justify-center rounded-xl bg-purple-400'>
				<div className='flex w-full flex-wrap'>
					{section1.map((title, index) => {
						return (
							<div
								id={`yt-trend-${index + 1}`}
								key={index}
								className={`m-2 flex w-full flex-shrink flex-grow items-center rounded-xl bg-purple-200 p-2 text-center ${
									index === 0 ? '' : 'sm:w-1/3'
								}`}
							>
								<p className='w-full'>
									#{index + 1} - {title}
								</p>
							</div>
						)
					})}
					{section2.map((title, index) => {
						return (
							<div
								id={`yt-trend-${index + 4}`}
								key={index}
								className='m-2 flex w-full flex-shrink flex-grow items-center rounded-xl bg-purple-200 p-2 text-center sm:w-1/3'
							>
								<p className='w-full'>
									#{index + 4} - {title}
								</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
