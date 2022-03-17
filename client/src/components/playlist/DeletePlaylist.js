import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSpotifyDispatch, deletePlaylist } from '../../context/spotify';

function DeletePlaylist() {
  const navigate = useNavigate();
  const dispatch = useSpotifyDispatch();
  const { id } = useParams();
  useEffect(() => {
    const deleteData = async () => deletePlaylist(dispatch, id);
    deleteData();
    return navigate('/my-playlists');
  }, [id, dispatch, navigate]);

  return null;
}

export default DeletePlaylist;
