import { MagnifyingGlass } from 'react-loader-spinner'
import WebIcon from './WebIcon'

export default function Loading(props) {
	if (props.background) {
		return (
			<div className='flex h-screen w-full items-center justify-center bg-purple-200'>
				<MagnifyingGlass glassColor='#c0efff' color='#c084fc' />
			</div>
		)
	}

	return (
		<div className={`m-3 ${props.container ? 'w-96' : 'flex justify-center'}`}>
			<div className='flex items-center justify-center'>
				<WebIcon name={props.name} />
				<h2 className='text-2xl font-bold text-white'>{props.name}</h2>
			</div>
			<div
				className={`rounded-xl p-3 ${
					props.container ? 'bg-purple-400 bg-opacity-20' : ''
				}`}
			>
				<div className='flex items-center justify-center'>
					<MagnifyingGlass glassColor='#c0efff' color='#c084fc' />
				</div>
			</div>
		</div>
	)
}
