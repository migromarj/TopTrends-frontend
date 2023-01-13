export async function getServerSideProps() {
	try {
		const res = await fetch("http://localhost:8000/api/tests");
		const tests = await res.json();

		return {
			props: {
				tests,
			},
		};
	}catch (err) {
		const tests = []
		return {
			props: {
				tests,
			},
		};
	}
}

export default function Test({ tests }) {
	return (
		<div className="m-4">
			<h1 className="text-3xl font-bold underline">Test</h1>
			{tests.length === 0 && <h2 className="text-2xl font-bold">No se encontraron tests</h2>}
			{tests.length > 0 && tests.map((test) => (
				<div key={test.pk}>
					<h2 className="text-2xl font-bold">{test.pk} - {test.name}</h2>
				</div>
			))}
		</div>
	);
}
