import { SerializedError } from "@reduxjs/toolkit";

export interface UsersState {
    isLoading: boolean;
    data: User[]
    error:null | SerializedError;
}

export interface User {
    name: string,
    id: number
}