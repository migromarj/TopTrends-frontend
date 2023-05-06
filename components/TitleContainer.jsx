import WebIcon from './WebIcon'

export default function TitleContainer({ props }) {
	return (
		<div className='flex items-center justify-center'>
			{props?.name && <WebIcon name={props.name} />}
			{props?.name && (
				<h2 className='text-2xl font-bold text-white'>{props.name}</h2>
			)}
		</div>
	)
}
