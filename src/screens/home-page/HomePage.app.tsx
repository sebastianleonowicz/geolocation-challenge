import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet'

import './HomePage.styles.css';
import { LocationForm, DraggableMarker } from '@/components';
import { getGeoJsonFeatures } from '@/api';
import { useTypedSelector } from '@/store';

export const HomePage = () => {
	const { markerOneCoordinates, markerTwoCoordinates } = useTypedSelector((state) => ({...state.homePage}));
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
			<MapContainer center={markerOneCoordinates} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<DraggableMarker key='1' initialPosition={markerOneCoordinates} index={0}/>
				<DraggableMarker key='2' initialPosition={markerTwoCoordinates} index={1}/>
			</MapContainer>
			<button onClick={() => getGeoJsonFeatures(markerOneCoordinates.lng, markerOneCoordinates.lat, markerTwoCoordinates.lng, markerTwoCoordinates.lat)}>fetch geojson</button>
		</div>
	);
}
