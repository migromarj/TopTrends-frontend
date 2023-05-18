import { gql, useQuery } from '@apollo/client'

const GET_ALL_COUNTRIES = gql`
	query {
		allCountries {
			name
			acronym
			flag
			woeid
			pn
		}
	}
`
function useCountries() {
	const { data } = useQuery(GET_ALL_COUNTRIES)
	return { data }
}

const GET_SPECIFIC_COUNTRY = gql`
	query GetSpecificCountry($acronym: String) {
		allCountries(acronym: $acronym) {
			name
			flag
			woeid
			pn
			lat
			lng
		}
	}
`

function useSpecificCountry(acronym) {
	const { data, loading, error } = useQuery(GET_SPECIFIC_COUNTRY, {
		variables: { acronym },
	})

	return { data, loading, error }
}

const GET_COUNTRY_TWITTER_TRENDS = gql`
	query GetCountryTwitterTrends($country: String!, $trendsNumber: Int!) {
		countryTwitterTrends(country: $country, trendsNumber: $trendsNumber) {
			id
			name
		}
	}
`

function useCountryTwitterTrends(props) {
	const { data, loading, error } = useQuery(GET_COUNTRY_TWITTER_TRENDS, {
		variables: { country: props.name, trendsNumber: 10 },
	})

	return { data, loading, error }
}

const GET_COUNTRY_GOOGLE_TRENDS = gql`
	query GetCountryGoogleTrends($country: String!, $trendsNumber: Int!) {
		countryGoogleTrends(country: $country, trendsNumber: $trendsNumber) {
			id
			name
		}
	}
`

function useCountryGoogleTrends(props) {
	const { data, loading, error } = useQuery(GET_COUNTRY_GOOGLE_TRENDS, {
		variables: { country: props.name, trendsNumber: 10 },
	})

	return { data, loading, error }
}

const GET_COUNTRY_YOUTUBE_TRENDS = gql`
	query GetCountryYouTubeTrends(
		$country: String!
		$trendType: String!
		$trendsNumber: Int!
	) {
		countryYouTubeTrends(
			country: $country
			trendType: $trendType
			trendsNumber: $trendsNumber
		) {
			id
			title
			videoId
			viewCount
			likeCount
			commentCount
		}
	}
`

function useCountryYouTubeTrends(props, trendsNumber = 10) {
	const { data, loading, error } = useQuery(GET_COUNTRY_YOUTUBE_TRENDS, {
		variables: {
			country: props.name,
			trendType: props.type,
			trendsNumber,
		},
	})

	return { data, loading, error }
}

const GET_WORD_INTEREST = gql`
	query GetWordInterest(
		$word: String!
		$country: String!
		$periodType: String!
	) {
		wordGoogleTrends(word: $word, country: $country, periodType: $periodType) {
			id
			trendDatetime
			value
		}
	}
`

function useWordInterest(props) {
	const { data, loading, error } = useQuery(GET_WORD_INTEREST, {
		variables: {
			word: props.word,
			country: props.country,
			periodType: props.period,
		},
	})

	return { data, loading, error }
}

const GET_WORD_TOPICS = gql`
	query GetWordTopics(
		$word: String!
		$country: String!
		$periodType: String!
		$topicsNumber: Int!
	) {
		wordRelatedTopics(
			word: $word
			country: $country
			periodType: $periodType
			topicsNumber: $topicsNumber
		) {
			id
			topicTitle
			topicType
			value
		}
	}
`

function useWordTopics(props) {
	const { data, loading, error } = useQuery(GET_WORD_TOPICS, {
		variables: {
			word: props.word,
			country: props.country,
			periodType: props.period,
			topicsNumber: 5,
		},
	})
	return { data, loading, error }
}

const GET_SPECIFIC_YOUTUBE_VIDEO = gql`
	query GetSpecificYouTubeVideo($videoId: String!) {
		youTubeVideo(videoId: $videoId) {
			title
		}
	}
`

function useSpecificYouTubeVideo(props) {
	const { data, loading, error } = useQuery(GET_SPECIFIC_YOUTUBE_VIDEO, {
		variables: { videoId: props.videoId },
	})

	return { data, loading, error }
}

export {
	useCountries,
	useSpecificCountry,
	useCountryTwitterTrends,
	useCountryGoogleTrends,
	useCountryYouTubeTrends,
	useWordInterest,
	useWordTopics,
	useSpecificYouTubeVideo,
}
