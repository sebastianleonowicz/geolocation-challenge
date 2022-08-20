import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import { LocationForm } from '../../components/location-form';

export const HomePage = () => {
	console.log('remount')
	const [searchParams, setSearchParams] = useSearchParams();
	const currentQuery = searchParams.get('query');
	const [locationQuery, setLocationQuery] = useState<string>(currentQuery ? currentQuery : '');
	const [hasRequested, setHasRequested] = useState<boolean>(false);

	const handleCheckLocation = useCallback(() => {
		if (locationQuery !== currentQuery) {
			setSearchParams({
				query: locationQuery,
			})
		}
		console.log('checkLocation', locationQuery);
	}, [locationQuery]);

	useEffect(() => {
		console.log('123', hasRequested);
		if (currentQuery && !hasRequested) {
			handleCheckLocation();
			setHasRequested(true);
		}
	}, [])

	return (
		<div className="App">
			<LocationForm
				setLocationQuery={setLocationQuery}
				locationQuery={locationQuery}
				handleCheckLocation={handleCheckLocation}
			/>
		</div>
	);
}
