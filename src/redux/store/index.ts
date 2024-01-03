import { configureStore } from '@reduxjs/toolkit';
import themeSlice from '../slices/themeSlice';
const store = configureStore({
    reducer: {
        theme: themeSlice,
        // Add other reducers as needed
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
