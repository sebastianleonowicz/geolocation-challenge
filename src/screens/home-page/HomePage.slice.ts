import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FeatureCollection } from 'geojson';

import { DEFAULT_MARKER_COORDINATE_BOUNDS } from '@/screens/home-page/HomePage.constants';
import { AppDispatch } from '@/store';
import { getGeoJsonFeatures } from '@/api'

export interface Coordinates {
	lat: number,
	lng: number,
}

export interface CoordinateBounds {
	northEast: Coordinates,
	southWest: Coordinates,
}

interface HomePageState {
	coordinateBounds: CoordinateBounds,
	geoJson: FeatureCollection | null,
	showSpinner: boolean,
}

type RootState = {
	homePage: HomePageState
}

export const initialState: HomePageState= {
	coordinateBounds: DEFAULT_MARKER_COORDINATE_BOUNDS,
	geoJson: null,
	showSpinner: false,
};

export const fetchGeoJSON = createAsyncThunk<
	FeatureCollection,
	undefined,
	{
		dispatch: AppDispatch;
		state: RootState;
	}
	>('homePage/fetchGeoJSON', async (_ = undefined, { getState }) => {
		const { homePage: { coordinateBounds } } = getState();
		return await getGeoJsonFeatures(
			coordinateBounds.southWest.lng,
			coordinateBounds.southWest.lat,
			coordinateBounds.northEast.lng,
			coordinateBounds.northEast.lat
		);
});


export const homePageSlice = createSlice({
	name: 'homePage',
	initialState,
	reducers: {
		changeMarkerCoordinates(state: HomePageState, { payload }: PayloadAction<CoordinateBounds>) {
			return {
				...state,
				coordinateBounds: payload,
				geoJson: null,
			}
		},
	},
	extraReducers(builder) {
		builder.addCase(fetchGeoJSON.fulfilled, (state: HomePageState, { payload }) => {
			state.geoJson = payload;
			state.showSpinner = false;
		});
		builder.addCase(fetchGeoJSON.pending, (state: HomePageState) => {
			state.showSpinner = true;
		});
		builder.addCase(fetchGeoJSON.rejected, (state: HomePageState, { payload }) => {
			console.log('payload', payload);
			state.showSpinner = false;
		});
	},
});

export const { changeMarkerCoordinates } =
	homePageSlice.actions;

export const homePageReducer = homePageSlice.reducer;
