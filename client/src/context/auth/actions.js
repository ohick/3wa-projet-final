import axiosWrapper from '../../lib/axiosWrapper';

async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    if (!loginPayload.credential.length || !loginPayload.password.length) {
      return dispatch({ type: 'LOGIN_ERROR', error: 'Veuillez remplir tous les champs' });
    }

    const response = await axiosWrapper({
      method: 'POST',
      url: '/login',
      data: loginPayload,
    });

    if (response.status === 200) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
      return response.data;
    }

    return dispatch({ type: 'LOGIN_ERROR', error: response.data.errors[0] });
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error });
  }
  return dispatch({ type: 'LOGIN_ERROR', error: 'euh' });
}

async function logout(dispatch) {
  await axiosWrapper({
    method: 'GET',
    url: '/logout',
  });
  return dispatch({ type: 'LOGOUT' });
}

async function registerUser(dispatch, registerPayload) {
  try {
    if (Object.keys(registerPayload).some((key) => !registerPayload[key].length)) {
      return dispatch({ type: 'LOGIN_ERROR', error: 'Veuillez remplir tous les champs' });
    }
    if (registerPayload.password.toLowerCase() !== registerPayload.passwordConfirm.toLowerCase()) {
      return dispatch({ type: 'LOGIN_ERROR', error: 'Mauvais mot de passe.' });
    }

    const response = await axiosWrapper({
      method: 'POST',
      url: '/register',
      data: registerPayload,
    });

    if (response.status === 200) {
      return dispatch({ type: 'REGISTER_SUCCESS' });
    }
    return dispatch({ type: 'LOGIN_ERROR', error: response.data.errors[0] });
  } catch (err) {
    dispatch({ type: 'LOGIN_ERROR', error: err });
  }
  return dispatch({ type: 'LOGIN_ERROR', error: 'euh' });
}

async function validateSession(dispatch) {
  const response = await axiosWrapper({
    method: 'GET',
    url: '/session',
  });

  if (response.status === 200) {
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    return response.data;
  }
  return dispatch({ type: 'LOGOUT' });
}

export {
  loginUser, logout, registerUser, validateSession,
};
