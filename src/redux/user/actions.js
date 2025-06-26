export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

export const updateUserDetails = (updatedDetails) => ({
  type: 'UPDATE_USER_DETAILS',
  payload: updatedDetails,
});