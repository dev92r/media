import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../components/model/user";

const deleteUser = createAsyncThunk("user/delete", async (user: User) => {
    await fetch(`http://localhost:3005/users/${user.id}`, {
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
        }
    })
    return user;
})

export {deleteUser}