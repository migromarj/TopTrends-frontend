import Image from 'next/image'

export default function WebIcon(props) {
	if (props.name === 'Twitter') {
		return (
			<Image
				src='/../public/images/twitter-icon.png'
				alt='Twitter Icon'
				width={25}
				height={25}
				className='m-1'
			/>
		)
	} else if (props.name === 'Google') {
		return (
			<Image
				src='/../public/images/google-icon.png'
				alt='Google Icon'
				width={25}
				height={25}
				className='m-1'
			/>
		)
	} else if (props.name === 'YouTube') {
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
