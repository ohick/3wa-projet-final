export const initialState = {
  username: null,
};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'GET_USER':
    case 'REQUEST_LOGIN':
      return {
        ...state,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        username: action.payload.username,
      };
    case 'LOGOUT': return initialState;
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        username: '',
      };

    case 'LOGIN_ERROR':
      return {
        ...state,
        isAuth: false,
        errorMessage: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
