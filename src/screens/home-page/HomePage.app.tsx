import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios';

import './HomePage.styles.css';
import { LocationForm } from '@/components/location-form';
var osmtogeojson = require('osmtogeojson');

const center = {
	lat: 51.505,
	lng: -0.09,
}

const center2 = {
	lat: 51.500,
	lng: -0.09,
}

interface Coordinates {
	lat: number,
	lng: number,
}

interface DraggableMarkerProps {
	initialPosition: Coordinates
}

const getGeoJsonFeatures = async (minLon: number, minLat: number, maxLon: number, maxLat: number) => {
	axios.get(
		`https://www.openstreetmap.org/api/0.6/map?bbox=0.20,51.28,0.21,51.3`,
		{
			//@ts-ignore
			'Content-Type': 'application/xml; charset=utf-8'
		}
	).then((response) => {
		console.log(response.data)
		let result = osmtogeojson(response.data);
		console.log(result);
	});
}

const DraggableMarker = ({ initialPosition }: DraggableMarkerProps) => {
	const [position, setPosition] = useState(initialPosition)
	console.log('initialPosition', initialPosition);
	const markerRef = useRef(null)
	const eventHandlers = useMemo(
		() => ({
			dragend() {
				const marker = markerRef.current
				if (marker != null) {
					// @ts-ignore
					setPosition(marker.getLatLng())
				}
			},
		}),
		[],
	)

	return (
		<Marker
			draggable={true}
			eventHandlers={eventHandlers}
			position={position}
			ref={markerRef}>
		</Marker>
	)
}

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
			<MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<DraggableMarker key='1' initialPosition={center}/>
				<DraggableMarker key='2' initialPosition={center2}/>
			</MapContainer>
			<button onClick={() => getGeoJsonFeatures(center.lng, center.lat, center.lng, center.lat)}>fetch geojson</button>
		</div>
	);
}
