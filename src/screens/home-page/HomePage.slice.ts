import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_MARKER_COORDINATE_BOUNDS } from '@/screens/home-page/HomePage.constants';

//TODO: use LatLng from leaflet
export interface Coordinates {
	lat: number,
	lng: number,
}

export interface CoordinateBounds {
	northEast: Coordinates,
	southWest: Coordinates,
}

interface HomePageStateProps {
	coordinateBounds: CoordinateBounds,
}

export const initialState: HomePageStateProps = {
	coordinateBounds: DEFAULT_MARKER_COORDINATE_BOUNDS,
};

export const homePageSlice = createSlice({
	name: 'homePage',
	initialState,
	reducers: {
		changeMarkerCoordinates(state: HomePageStateProps, { payload }: PayloadAction<CoordinateBounds>) {
			return {
				...state,
				coordinateBounds: payload
			}
		},
	},
	extraReducers(builder) {
	},
});

export const { changeMarkerCoordinates } =
	homePageSlice.actions;

export const homePageReducer = homePageSlice.reducer;
