import Loading from './Loading'
import Emotion from './Emotion'
import Error from './Error'
import YouTubeDetails from './YouTubeDetails'
import { useSpecificYouTubeVideo } from '../services/services'

export default function YouTubeData(props) {
	const { data, loading, error } = useSpecificYouTubeVideo(props)

	if (loading) {
		return <Loading />
	}

	if (error) {
		return <Error />
	}

	if (data && data.youTubeVideo !== null) {
		const title = data.youTubeVideo.title
		const description = data.youTubeVideo.description
		const thumbnail = data.youTubeVideo.thumbnail
		const viewCount = data.youTubeVideo.viewCount
		const likeCount = data.youTubeVideo.likeCount
		const commentCount = data.youTubeVideo.commentCount
		const channelTitle = data.youTubeVideo.channelTitle
		const publishedAt = data.youTubeVideo.publishedAt

		return (
			<div>
				<h1
					id='details-video-title'
					className='mx-10 mb-10 mt-5 text-center text-3xl font-bold text-purple-400'
				>
					{title}
				</h1>
				<YouTubeDetails
					videoId={props.videoId}
					description={description}
					thumbnail={thumbnail}
					viewCount={viewCount}
					likeCount={likeCount}
					commentCount={commentCount}
					channelTitle={channelTitle}
					publishedAt={publishedAt}
				/>
				<h1
					id='video-emotions-title'
					className='mx-10 mb-10 mt-5 text-center text-2xl font-bold text-white'
				>
					Emotions 😊
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
