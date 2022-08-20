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
	});

export const store = getStore();

export type AppDispatch = typeof store.dispatch;
export type StoreProps = typeof store;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
