import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slices/usersSlice";

const store = configureStore({
    reducer: {
        users: usersReducer
    }
})

export {store}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
export * from "../store/thunk/fetchUsers"
export * from "./thunk/addUser"
export * from "./thunk/deleteUser"