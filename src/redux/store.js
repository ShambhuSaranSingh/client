import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        userDetails: (state = null, action) => {
            switch(action.type) {
                // This case will help in supporting login case
                case 'SET_USER':
                    return action.payload;
                // This case will help in supporting logout case
                case 'CLEAR_USER':
                    return null;
                // Handle case where other state update triggers
                //userDetails' reducer
                default:
                    return state;
            }
        },
    }
});

{
    type: 'SET'
}