import Image from 'next/image'
import WebIcon from './WebIcon'

export default function Error(props) {
	if (props.background) {
		return (
			<div className='flex h-screen w-full items-center justify-center bg-purple-200'>
				<Image
					src='/images/error-icon.png'
					alt='Error'
					width={200}
					height={200}
				/>
			</div>
		)
	}

	return (
		<div id='error-container' className='flex w-full justify-center'>
			<div className='m-3 w-96'>
				<div className='flex items-center justify-center'>
					<WebIcon name={props.name} />
					<h2 className='text-2xl font-bold text-white'>{props.name}</h2>
				</div>
				<div className='rounded-xl bg-purple-400 bg-opacity-20 p-3'>
					<div className='flex items-center justify-center'>
						<Image
							id='errorIcon'
							src='/images/error-icon.png'
							alt='Error'
							width={40}
							height={40}
						/>
						<h1 id='error-text' className='text-3xl font-bold text-white'>
							Data not found
						</h1>
					</div>
				</div>
			</div>
		</div>
	)
}
