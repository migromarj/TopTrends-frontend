import Footer from './Footer'
import Image from 'next/image'

export default function Earth(props) {
	return (
		<span id='background'>
			<div>
				<Image
					src='/images/night-sky.png'
					alt='background'
					className='z-0'
					fill
					style={{ objectFit: 'cover' }}
				/>
				{props.footer && <Footer absolute />}
			</div>
		</span>
	)
}
