import {
    configureStore,
    combineReducers,
} from "@reduxjs/toolkit";
import counterReducer from '../slices/countSlice';
import storage from 'redux-persist/lib/storage';
import {
    persistReducer, persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers({
    counter: counterReducer,
});
const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(
    persistConfig,
    rootReducer
);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }),
});
export const persistor = persistStore(store);

export type RootSate = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
