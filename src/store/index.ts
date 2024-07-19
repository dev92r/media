import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";
import { albumsApi } from "./apis/albumsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        users: usersReducer,
        [albumsApi.reducerPath]:albumsApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(albumsApi.middleware)
    }
})

setupListeners(store.dispatch)

export {store}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
export * from "../store/thunk/fetchUsers"
export * from "./thunk/addUser"
export * from "./thunk/deleteUser"
export {useFetchAlbumsQuery, useAddAlbumMutation, useDeleteAlbumMutation} from "./apis/albumsApi"