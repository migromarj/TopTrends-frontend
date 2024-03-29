import Earth from './Earth'

export default function EarthMap({ children }) {
	return (
		<div>
			<div className='fixed h-screen w-screen'>
				<Earth />
			</div>
			<div className='absolute w-full'>{children}</div>
		</div>
	)
}
