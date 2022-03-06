export const initialState = {
  username: null,
  id: null,
  role: null,
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
        id: action.payload.id,
        role: action.payload.role,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        isAuth: false,
        errorMessage: action.error,
      };
    case 'LOGOUT': return initialState;
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        username: '',
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
