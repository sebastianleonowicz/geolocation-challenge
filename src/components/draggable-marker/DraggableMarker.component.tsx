import React, { useMemo, useRef, useState } from 'react';
import {Marker} from 'react-leaflet';

import { useAppDispatch } from '@/store';
import { Coordinates, changeMarkerCoordinates } from '@/screens/home-page/HomePage.slice';

interface DraggableMarkerProps {
	initialPosition: Coordinates,
	index: number,
}

export const DraggableMarker = ({ initialPosition, index }: DraggableMarkerProps) => {
	const dispatch = useAppDispatch();

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
					// @ts-ignore
					dispatch(changeMarkerCoordinates({
						// @ts-ignore
						lat: marker.getLatLng().lat,
						// @ts-ignore
						lng: marker.getLatLng().lng,
						index: index,
					}))
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
