import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { User } from "../model/user";
interface Props {
    thunk: (arg?:any) => AsyncThunkAction<any, any, any>;
  }
  
export const useThunk = ({ thunk }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch<AppDispatch>();
    const runThunk = useCallback((arg?: User) => {
      setIsLoading(true);
      dispatch(thunk(arg))
        .unwrap()
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    }, [dispatch, thunk]);
  
    return { runThunk, isLoading, error };
  };