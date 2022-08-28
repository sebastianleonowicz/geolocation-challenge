import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import './HomePage.styles.css';
import { GeolocationMap, DatasetDisplay } from '@/components';

export const HomePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentQuery = searchParams.get('query');
	const [locationQuery, ,] = useState<string>(currentQuery ? currentQuery : '');
	const [hasRequested, setHasRequested] = useState<boolean>(false);

	const handleCheckLocation = useCallback(() => {
		if (locationQuery !== currentQuery) {
			setSearchParams({
				query: locationQuery,
			})
		}
	}, [locationQuery]);

	useEffect(() => {
		if (currentQuery && !hasRequested) {
			handleCheckLocation();
			setHasRequested(true);
		}
	}, [])

	return (
		<main className='app'>
			<aside className='datasetDisplay'>
				<DatasetDisplay />
			</aside>
			<GeolocationMap />
		</main>
	);
}
