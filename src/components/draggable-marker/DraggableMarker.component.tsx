import React, { useMemo, useRef, useState } from 'react';
import {Marker} from 'react-leaflet';

interface Coordinates {
	lat: number,
	lng: number,
}

interface DraggableMarkerProps {
	initialPosition: Coordinates
}

export const DraggableMarker = ({ initialPosition }: DraggableMarkerProps) => {
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
