import Image from 'next/image'
import Link from 'next/link'

export default function NavBar(props) {
	return (
		<div
			id='navBar'
			className={`h-15 absolute ${
				props.zIndex ? 'z-0' : 'z-30'
			} flex w-full items-center justify-center text-white`}
		>
			<Link href='/' className='flex items-center py-2'>
				<Image
					id='brandIcon'
					src='/images/web-icon.png'
					alt='Web icon'
					width={50}
					height={50}
					className=''
				/>
				<h1
					id='brand'
					className='ml-2 select-none font-signature text-6xl font-bold'
				>
					TopTrends
				</h1>
			</Link>
		</div>
	)
}
