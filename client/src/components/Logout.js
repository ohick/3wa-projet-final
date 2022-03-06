import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { logout, useAuthDispatch } from '../context/auth';

function Logout() {
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  useEffect(() => {
    logout(dispatch);
    return navigate('/');
  });

  return null;
}

export default Logout;
