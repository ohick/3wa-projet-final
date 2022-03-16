import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axiosWrapper from '../../lib/axiosWrapper';

function DeletePlaylist() {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const deleteData = async () => axiosWrapper({
      method: 'DELETE',
      url: `/playlist/${id}`,
    });
    deleteData();
    return navigate('/my-playlists');
  }, []);

  return null;
}

export default DeletePlaylist;
