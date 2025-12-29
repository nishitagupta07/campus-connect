// import { combineReducers, configureStore } from '@reduxjs/toolkit';
// import userReducer from './user/userSlice';
// import postReducer from './post/postSlice';
// import profileReducer from './profile/profileSlice'; // ✅ lowercase for consistency
// import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import authReducer from "./auth/authSlice";

// // ✅ Combine reducers
// const rootReducer = combineReducers({
//   user: userReducer,
//   post: postReducer,
//   profiles: profileReducer,
//    auth: authReducer,  // ✅ lowercase key
// });

// const persistConfig = {
//   key: 'root',
//   storage,
//   version: 1,
//   blacklist: ['post'], // ✅ Only one blacklist
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // ✅ Create store
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// // ✅ Create persistor
// export const persistor = persistStore(store);



import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import postReducer from './post/postSlice';
import profileReducer from './profile/profileSlice'; // ✅ lowercase for consistency
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from "./auth/authSlice";

// ✅ Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
  profiles: profileReducer,
   auth: authReducer,  // ✅ lowercase key
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  blacklist: ['post'], // ✅ Only one blacklist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// ✅ Create persistor
export const persistor = persistStore(store);