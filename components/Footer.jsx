export default function Footer(props) {
	const today = new Date()
	const year = today.getFullYear()

	return (
		<div
			id='footer'
			className={`flex items-start justify-center shadow ${
				props.absolute ? 'absolute bottom-0 w-full' : 'pt-12 pb-4'
			}`}
		>
			<span className='select-none text-center text-sm font-bold text-gray-500'>
				Designed by Miguel Romero Arjona 🦎
				<br />
				&copy; {year}
			</span>
		</div>
	)
}
