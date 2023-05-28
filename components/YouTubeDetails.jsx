import React, { useState } from 'react'
import Image from 'next/image'
import { parseDate } from './WordInterestGraph'
import Link from 'next/link'
import Modal from 'react-modal'

export default function YouTubeData(props) {
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const openModal = () => {
		setModalIsOpen(true)
	}

	const closeModal = () => {
		setModalIsOpen(false)
	}

	const customStyles = {
		content: {
			backgroundColor: '#e9d5ff',
			border: '2px solid black',
		},
	}

	return (
		<div
			id='video-details-section'
			className='flex w-full flex-wrap justify-center'
		>
			<div id='details-video-image' className='m-5 flex justify-center'>
				<Image
					src={props.thumbnail}
					width={600}
					height={500}
					alt='YouTube video thumbnail'
					className='rounded-xl border-2 border-purple-800'
				/>
			</div>
			<div className='w-90 flex justify-center'>
				<div className='m-2 flex w-full flex-col justify-between rounded-xl bg-purple-800 p-4 text-center text-lg font-bold text-black'>
					<span id='details-video-section-title' className='mb-5 text-white'>
						Upload by {props.channelTitle} on {parseDate(props.publishedAt)}
					</span>
					<div
						id='details-video-section-statistics'
						className='flex h-full flex-col justify-around rounded-xl bg-purple-200'
					>
						<span>{props.viewCount} views 👁️</span>
						<span>{props.likeCount} likes 👍</span>
						<span>{props.commentCount} comments 💬</span>
					</div>
					<div className='mt-5 flex flex-row justify-around'>
						<button
							id='details-video-section-description'
							onClick={openModal}
							className='rounded-xl bg-purple-200 p-2'
						>
							Description
						</button>
						<Link
							id='details-video-section-redirect'
							className='rounded-xl bg-purple-200 p-2'
							href={'https://www.youtube.com/watch?v=' + props.videoId}
						>
							Go to video
						</Link>
					</div>
				</div>
			</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
			>
				<div className='flex h-full flex-col justify-between'>
					<div className='whitespace-pre-line'>{props.description}</div>
					<div>
						<hr className='my-5 border-2 border-black' />
						<div className='mb-5 flex w-full justify-center'>
							<button
								onClick={closeModal}
								className='rounded-xl bg-red-400 p-4 px-8 font-bold'
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	)
}
