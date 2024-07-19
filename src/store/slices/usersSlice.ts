import { createSlice } from "@reduxjs/toolkit";
import { addUser, deleteUser, fetchUsers } from "..";
import { UsersState } from "../../components/model/user";


const initialState: UsersState = 
    {
        isLoading:false,
        data:[],
        error: null
    }


const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase((addUser.pending), (state, action) => {
            state.isLoading = true;
        });
        builder.addCase((addUser.fulfilled), (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload); 
        });
        builder.addCase((addUser.rejected), (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase((deleteUser.pending), (state, action) => {
            state.isLoading = true;
        });
        builder.addCase((deleteUser.fulfilled), (state, action) => {
            state.isLoading = false;
            const updatedData = state.data.filter((user) => {
              return  user.id !== action.payload.id
            })
            state.data = updatedData
        });
        builder.addCase((deleteUser.rejected), (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

    }
})

export const usersReducer = usersSlice.reducer;