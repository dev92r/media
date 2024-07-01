import { createAsyncThunk } from "@reduxjs/toolkit";
import {  faker } from "@faker-js/faker";



const addUser = createAsyncThunk("user/add", async () => {
    const fakeUserName = {name: faker.name.fullName()}
   const response = await fetch("http://localhost:3005/users", {
        method:"POST",
        headers:{
           "Content-Type": "application/json",
        },
        body: JSON.stringify(fakeUserName),
    }).then((result) => {
        return result.json()
    })
    return response;
})

export {addUser}