import { 
    SIDEBAR_SET,
    GENERATED_SIGNS
} from "../types/app.types";

export const ctrlSidebar  = (set_state) => dispatch =>
{
    dispatch({
        type: SIDEBAR_SET,
        payload: set_state
    })
}

export const updateGeneratedSigns = (signs) => dispatch => 
{
    dispatch({
        type: GENERATED_SIGNS,
        payload: signs
    })    
}