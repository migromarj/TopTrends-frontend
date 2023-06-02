import {
	ApolloProvider,
	ApolloClient,
	InMemoryCache,
	HttpLink,
} from '@apollo/client'

import '../styles/globals.css'

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: process.env.BACKEND_DEPLOYMENT || 'http://localhost:8000/api/',
	}),
})

export default function App({ Component, pageProps }) {
	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	)
}
