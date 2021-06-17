const INITIALE_CONNECTED_STATE = {
    connected: false,
}

function connectedReducer(state = INITIALE_CONNECTED_STATE, action) {

    switch(action.type) {
        case 'CONNECT': {
            return {
                connected: true
            }
        }

        case 'DISCONNECT': {
            return {
                connected: false
            }
        }

        default:
            return state
    }

}
export default connectedReducer;