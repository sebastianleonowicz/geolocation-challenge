import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { combineReducers } from 'redux';

import { homePageReducer } from '@/screens/home-page/HomePage.slice';

export const rootReducer = combineReducers({
	homePage: homePageReducer,
});

export const getStore = () =>
	configureStore({
		reducer: rootReducer,
		/**
		 *
		 * CoordinateBounds seems to be treated as non-serializable by redux. If this is certain is unknown at this time,
		 * serializableCheck is disabled to mitigate the issue.
		 */
		middleware: getDefaultMiddleware => getDefaultMiddleware({
			serializableCheck: false,
		})
	});

export const store = getStore();

export type AppDispatch = typeof store.dispatch;
export type StoreProps = typeof store;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
