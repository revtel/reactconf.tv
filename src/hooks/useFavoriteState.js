import React from 'react';
import {Context} from '../AppContext';

export default function useFavoriteState({confId, talkIdx}) {
  const app = React.useContext(Context);
  const isInFavorite = app.actions.isInFavorite(confId, talkIdx);

  function toggleFavoriteState({title, thumbnail}) {
    app.actions.saveToFavorite(
      {
        confId,
        talkIdx,
        title,
        thumbnail,
      },
      !isInFavorite,
    );
    app.actions.setToast(
      isInFavorite ? 'Remove from favorites done' : 'Add to favorates done',
    );
  }

  return {
    isInFavorite,
    toggleFavoriteState,
  };
}
