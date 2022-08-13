const types ={
    ChangeActualHost:"pruebaa"
}
const initialStore= {
    user:   'Gatrixd',
    actualHost: '192.168.0.11',
    cameras: [{
        name: 'Casa',
        ip: '192.168.0.11'
    },
    {
        name: 'Casa2',
        ip: '192.168.0.13'
    }]
}

const storeReducer = (state,action) =>{
    switch(action.type){
        case types.ChangeActualHost:
            return {
                ...state,
                actualHost: action.name
            }
        default:
            return state;
    }

}

export {initialStore, types }
export default storeReducer;