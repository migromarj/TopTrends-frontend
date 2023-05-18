import Head from 'next/head'
import Loading from './Loading'
import Error from './Error'

export default function LoadingError({ loading, error }) {
	return (
		<div>
			<Head>
				<title>TopTrends | {loading ? 'Loading' : error ? 'Error' : ''}</title>
			</Head>
			<main>{renderContent(loading, error)}</main>
		</div>
	)
}

function renderContent(loading, error) {
	if (loading) {
		return <Loading background />
	}

	if (error) {
		return <Error background />
	}

	return null
}
