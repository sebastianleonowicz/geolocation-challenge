import { createSlice } from '@reduxjs/toolkit';

interface HomePageStateProps {
	test: string,
}
//
export const initialState: HomePageStateProps = {
	test: 'testValue',
};

export const homePageSlice = createSlice({
	name: 'cvDashboard',
	initialState,
	reducers: {},
	extraReducers(builder) {
	},
});

// export const { } =
// 	cvDashboardSlice.actions;

export const homePageReducer = homePageSlice.reducer;
