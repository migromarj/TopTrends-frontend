import Image from 'next/image'

export default function Title(props) {
	return (
		<div>
			<div className='m-2 flex flex-row items-center text-white'>
				<Image
					src={props.flag}
					alt={`${props.name} flag`}
					width={100}
					height={75}
					className='mr-2'
				/>
				<div className='ml-2 text-3xl font-bold'>{props.name}</div>
			</div>
			<hr className='m-2 w-11/12 border-2 border-purple-900' />
		</div>
	)
}
