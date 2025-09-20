import { useEffect, useState } from 'react';

export const useFetch = (url) => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		const fetchData = async () => {
			try {
				setLoading(true);
				const response = await fetch(url, { signal });

				if (!response.ok) {
					throw new Error(`Error fetching data: ${response.status}`);
				}

				const result = await response.json();
				setData(result);
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError('Failed to fetch data');
					console.error(err);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();

		return () => controller.abort();
	}, [url]);

	return { data, loading, error };
};
