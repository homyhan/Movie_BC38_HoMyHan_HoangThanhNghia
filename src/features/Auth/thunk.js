import { AuthService } from "./services/AuthService";

export const login =(data)=>{
    return async (dispatch)=>{
        try {
            const res = await AuthService.login(data);
            dispatch({
                type: "LOGIN",
                payload: res.data.content
            })
            localStorage.setItem("TOKEN", res.data.content.accessToken);
            localStorage.setItem("USER_LOGIN", JSON.stringify(res.data.content))
            
        } catch (error) {
            console.log(error);
        }
    }
}

export const fetchProfile = async (dispatch)=>{
    try {
        const res = await AuthService.fetchProfile();
        dispatch({
            type: "LOGIN",
            payload: res.data.content
        })
        
    } catch (error) {
        console.log(error);
    }
}