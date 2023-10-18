import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {usersReducer} from '../features/users/usersSlice';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {cocktailsReducer} from '../features/cocktails/cocktailsSlice.ts';

const usersPersistConfig = {
  key: 'store:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  cocktailsStore: cocktailsReducer,
  usersStore: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
