import Emotion from './Emotion'
import Loading from './Loading'
import Error from './Error'
import { useSpecificYouTubeVideo } from '../services/services'

export default function YouTubeEmotion(props) {
	const { data, loading, error } = useSpecificYouTubeVideo(props)

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
