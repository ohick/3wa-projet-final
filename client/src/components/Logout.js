import { useEffect } from 'react';

import { logout, useAuthDispatch } from '../context/auth';

function Logout() {
  const dispatch = useAuthDispatch();
  useEffect(() => logout(dispatch));

  return null;
}

export default Logout;
