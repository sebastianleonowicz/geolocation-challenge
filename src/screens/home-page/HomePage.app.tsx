import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet'

import './HomePage.styles.css';
import { LocationForm, DraggableMarker } from '@/components';
import { getGeoJsonFeatures } from '@/api';
import { DEFAULT_MARKER_COORDINATES_1, DEFAULT_MARKER_COORDINATES_2 } from './HomePage.constants';

export const HomePage = () => {
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
			<MapContainer center={DEFAULT_MARKER_COORDINATES_1} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<DraggableMarker key='1' initialPosition={DEFAULT_MARKER_COORDINATES_1}/>
				<DraggableMarker key='2' initialPosition={DEFAULT_MARKER_COORDINATES_2}/>
			</MapContainer>
			<button onClick={() => getGeoJsonFeatures(DEFAULT_MARKER_COORDINATES_1.lng, DEFAULT_MARKER_COORDINATES_1.lat, DEFAULT_MARKER_COORDINATES_1.lng, DEFAULT_MARKER_COORDINATES_1.lat)}>fetch geojson</button>
		</div>
	);
}
