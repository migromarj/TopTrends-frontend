import { gql, useQuery } from '@apollo/client'
import Emotion from './Emotion'
import Loading from './Loading'
import Error from './Error'

export default function YouTubeEmotion(props) {
	const GET_SPECIFIC_YOUTUBE_VIDEO = gql`
		query GetSpecificYouTubeVideo($videoId: String!) {
			youTubeVideo(videoId: $videoId) {
				title
			}
		}
	`

	const { data, loading, error } = useQuery(GET_SPECIFIC_YOUTUBE_VIDEO, {
		variables: { videoId: props.videoId },
	})

	if (loading) {
		return <Loading />
	}

	if (error) {
		return <Error />
	}

	console.log(data)

	if (data && data.youTubeVideo !== null) {
		const title = data.youTubeVideo.title

		return (
			<div>
				<h1
					id='statistics-word-title'
					className='mx-10 mb-10 mt-5 text-center text-3xl font-bold text-white'
				>
					<span className='text-purple-400'>{title} </span>
					<span className='text-white'>emotions 😊</span>
				</h1>
				<Emotion videoId={props.videoId} />
			</div>
		)
	} else if (data && data.youTubeVideo === null) {
		return (
			<div className='mt-10'>
				<Error />
			</div>
		)
	}
}
