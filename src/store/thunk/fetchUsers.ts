import { createAsyncThunk } from "@reduxjs/toolkit";

 const fetchUsers = createAsyncThunk("users/fetch", async () => {
    const response = await fetch("http://localhost:3005/users", {
        method:"GET",
        headers:{
            "Content-Type": "application/json",
        }
    }).then((result) => {
        return result.json()
    })
    return response
})

export {fetchUsers}