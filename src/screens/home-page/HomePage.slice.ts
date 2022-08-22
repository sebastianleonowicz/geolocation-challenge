import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_MARKER_COORDINATES_1, DEFAULT_MARKER_COORDINATES_2 } from '@/screens/home-page/HomePage.constants';

export interface Coordinates {
	lat: number,
	lng: number,
}

export interface MarkerMetadata extends Coordinates {
	index: number,
}

interface HomePageStateProps {
	markerOneCoordinates: Coordinates,
	markerTwoCoordinates: Coordinates,
}

export const initialState: HomePageStateProps = {
	markerOneCoordinates: DEFAULT_MARKER_COORDINATES_1,
	markerTwoCoordinates: DEFAULT_MARKER_COORDINATES_2,
};

export const homePageSlice = createSlice({
	name: 'homePage',
	initialState,
	reducers: {
		changeMarkerCoordinates(state: HomePageStateProps, { payload }: PayloadAction<MarkerMetadata>) {
			if (payload.index === 0) {
				return {
					...state,
					markerOneCoordinates: {
						lat: payload.lat,
						lng: payload.lng,
					}
				}
			}

			return {
				...state,
				markerTwoCoordinates: {
					lat: payload.lat,
					lng: payload.lng,
				}
			}
		},
	},
	extraReducers(builder) {
	},
});

export const { changeMarkerCoordinates } =
	homePageSlice.actions;

export const homePageReducer = homePageSlice.reducer;
