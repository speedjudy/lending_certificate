import { 
    SIDEBAR_SET,
    GENERATED_SIGNS
} from "../types/app.types";

const initialState = {
    sidebarShow: true,
    generatedSigns: []
}

export function appState(state = initialState, action) 
{
    switch (action.type) {
        case SIDEBAR_SET:
            if(typeof action.payload == 'object'){
                return {...state, ...action.payload}
            } else return {...state, sidebarShow: action.payload};
        case GENERATED_SIGNS:
            return {...state, generatedSigns: action.payload};
        default:
            return { ...state };
    }
}

export function getSigns(state = initialState)
{
    return state.generatedSigns;
}
