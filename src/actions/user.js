export const addUser=(user)=>{
    return async (dispatch)=>{
        await dispatch({type:'SET_USER',payload:user})
    }
}
export const cleareUser=()=>{
    return async (dispatch)=>{
        await dispatch({type:'CLEARE_USER',payload:{}})
    }
}