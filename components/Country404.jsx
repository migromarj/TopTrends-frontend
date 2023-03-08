import Image from 'next/image'

export default function Country404() {
	return (
		<div
			id='not-found-container'
			className='flex h-screen items-center justify-center bg-purple-200'
		>
			<Image
				id='error-icon'
				src='/../public/images/error-icon.png'
				alt='Error'
				width={50}
				height={50}
			/>
			<h1 id='not-found-text' className='text-5xl font-bold text-black'>
				Country not found
			</h1>
		</div>
	)
}
