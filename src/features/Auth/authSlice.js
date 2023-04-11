import {produce} from 'immer';
const initialState ={
    user: null,
    userSignup: null,
}

export const authReducer = (state= initialState, {type, payload})=>{
    return produce(state, (darft)=>{
        if(type === "LOGIN"){
            darft.user = payload            
        }
        if(type === "LOGOUT"){
            darft.user = null;
            localStorage.removeItem("TOKEN");
            localStorage.removeItem("USER_LOGIN");
        }
        if(type==="SIGNUP"){
            darft.userSignup = payload
        }
    })
}