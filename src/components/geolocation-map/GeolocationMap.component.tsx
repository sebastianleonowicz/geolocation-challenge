import React, { useRef } from 'react';
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";

import { DEFAULT_MARKER_COORDINATE_BOUNDS } from "@/screens/home-page/HomePage.constants";
import { EditControl } from "react-leaflet-draw";
import { changeMarkerCoordinates } from "@/screens/home-page/HomePage.slice";
import { useAppDispatch } from "@/store";

// interface GeolocationMapProps {}

export const GeolocationMap = () => {
    const featureGroupRef = useRef(null);
    const dispatch = useAppDispatch();

    return (
        <MapContainer center={[DEFAULT_MARKER_COORDINATE_BOUNDS.southWest.lat, DEFAULT_MARKER_COORDINATE_BOUNDS.southWest.lng]} zoom={13} scrollWheelZoom={false} doubleClickZoom touchZoom>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
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
    )
}