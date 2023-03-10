import Image from 'next/image'
import Link from 'next/link'
import NavBar from './NavBar'

export default function Title(props) {
	const path = window.location.pathname

	const getPreviousPage = () => {
		if (/^\/trends\/[a-zA-Z]{2}$/.test(path)) {
			return '/'
		} else if (/^\/trends\/[a-zA-Z]{2}\/words\/.+/.test(path)) {
			return `/trends/${props.code}`
		} else if (/^\/trends\/[a-zA-Z]{2}\/youtube$/.test(path)) {
			return `/trends/${props.code}`
		} else {
			return '/'
		}
	}

	return (
		<div className='flex flex-col'>
			<NavBar />
			<div id='countryTitle' className='mt-16'>
				<div className='m-2 flex flex-row items-center text-white'>
					<Link
						id='previousPage'
						href={getPreviousPage()}
						className='m-2 rounded-xl bg-purple-800 px-2 pb-1 text-5xl'
					>
						&lt;
					</Link>
					<Image
						id='countryFlag'
						src={props.flag}
						alt={`${props.name} flag`}
						width={100}
						height={75}
						className='mr-2'
					/>
					<div id='countryName' className='ml-2 text-3xl font-bold'>
						{props.name}
					</div>
				</div>
				<hr className='m-2 w-11/12 border-2 border-purple-900' />
			</div>
		</div>
	)
}
