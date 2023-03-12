import {produce} from 'immer';
const initialState = {
    movies:{},
    selectedFilm: null,
    userList: {},
    selectedUser: null,
    userListSearch: {},
    keySearch: [],
    moviesListFull:{}
}

export const adminReducer = (state=initialState, {type, payload})=>{
    return produce(state, (draft)=>{
        if(type==="SET_MOVIES_ADMIN"){
            draft.movies = payload
        }
        if(type === "SET_MOVIES_FULL_ADMIN"){
            draft.moviesListFull = payload
        }
        if(type === "SET_MOVIE_ITEM"){
            draft.selectedFilm = payload
        }
        if(type==="SET_USER_LIST"){
            draft.userList = payload
        }
        if(type==="SET_USER_ITEM"){
            draft.selectedUser = payload
        }
        if(type==="SET_USER_LIST_SEARCH"){
            draft.userListSearch =  payload
        }
        if(type === "SEARCH_FILM"){
            draft.keySearch = draft.movies.items.filter((item)=>{
                return item.tenPhim.toLowerCase().trim().includes(payload.toLowerCase().trim())
            });
            console.log(payload);
        }
    })
}