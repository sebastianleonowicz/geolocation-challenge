import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import './HomePage.styles.css';
import { useAppDispatch } from '@/store';
import { fetchGeoJSON } from './HomePage.slice';
import { GeolocationMap } from '@/components';

export const HomePage = () => {
	const dispatch = useAppDispatch();
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
				placeholder
				<button onClick={() => dispatch(fetchGeoJSON())}>fetch geojson</button>
			</aside>
			<GeolocationMap />
		</main>
	);
}
