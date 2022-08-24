import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw';

import './HomePage.styles.css';
import { useAppDispatch, useTypedSelector } from '@/store';
import { changeMarkerCoordinates, fetchGeoJSON } from './HomePage.slice';
import {DEFAULT_MARKER_COORDINATE_BOUNDS} from "@/screens/home-page/HomePage.constants";

export const HomePage = () => {
	const dispatch = useAppDispatch();
	const { coordinateBounds } = useTypedSelector((state) => ({...state.homePage}));
	const [searchParams, setSearchParams] = useSearchParams();
	const currentQuery = searchParams.get('query');
	const [locationQuery, setLocationQuery] = useState<string>(currentQuery ? currentQuery : '');
	const [hasRequested, setHasRequested] = useState<boolean>(false);
	const featureGroupRef = useRef(null);

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
			<MapContainer center={[DEFAULT_MARKER_COORDINATE_BOUNDS.southWest.lat, DEFAULT_MARKER_COORDINATE_BOUNDS.southWest.lng]} zoom={13} scrollWheelZoom={false} doubleClickZoom touchZoom>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{/*<DraggableMarker key='1' initialPosition={coordinateBounds.southWest} index={0}/>*/}
				<FeatureGroup ref={featureGroupRef}>
					<EditControl
						position="topright"
						onDrawStart={() => {
							// @ts-ignore
							featureGroupRef.current.clearLayers();
						}}
						onCreated={(e) => {
							const bounds = e.layer.getBounds()
							const payload = {
								northEast: bounds._northEast,
								southWest: bounds._southWest
							};

							dispatch(changeMarkerCoordinates(payload))
						}}
						draw={{
							circlemarker: false,
							marker: false,
							polygon: false,
							polyline: false,
							rectangle: { metric: true},
							circle: false,
						}}
					/>
				</FeatureGroup>
			</MapContainer>
			<button onClick={() => dispatch(fetchGeoJSON())}>fetch geojson</button>
		</div>
	);
}
