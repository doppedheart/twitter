import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    currentUser:null,
    isLoading: false,
    isError: false,
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.isLoading=true;
        },
        loginSuccess:(state,action)=>{
            state.isLoading=false;
            state.currentUser = action.payload;
        },
        loginFailed :(state)=>{
            state.isLoading=false;
            state.isError=true;
        },
        logout:(state)=>{
           return initialState;
        }

    }
})
export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logout
}=userSlice.actions;

export default userSlice.reducer;