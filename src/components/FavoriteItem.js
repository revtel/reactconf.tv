import React from 'react';
import {navigate} from 'gatsby';
import styled from 'styled-components';
import * as AppContext from '../AppContext';
import * as Widgets from './Widgets';
import {DeleteForever} from '@styled-icons/material';

function FavoriteItem(props) {
  const {item, style = {}} = props;
  const app = React.useContext(AppContext.Context);

  function deleteFavorite() {
    app.actions.saveToFavorite(item, false);
  }

  if (item === null) {
    // just a placeholder
    return <ItemWrapper style={style} />;
  }

  return (
    <ItemWrapper style={style}>
      <div className="talk-thumb">
        <img src={item.thumbnail} alt="snapshot for the talk" />
        <div className="delete" onClick={deleteFavorite}>
          <DeleteForever size={24} color="#4f77e2" />
        </div>
      </div>

      <div className={'talk-title'}>
        <div style={{padding: '0px 10px 10px 10px'}}>
          <div style={{marginBottom: 10}}>{item.title}</div>

          <Widgets.FlexRow style={{justifyContent: 'flex-end'}}>
            <Widgets.Button
              style={{marginRight: 5}}
              onClick={() =>
                navigate(`/player?conf=${item.confId}&idx=${item.talkIdx}`)
              }>
              Watch
            </Widgets.Button>
          </Widgets.FlexRow>
        </div>
      </div>
    </ItemWrapper>
  );
}

const ItemWrapper = styled.div`
  margin-bottom: 20px;

  & .talk-thumb {
    width: 100%;
    padding-bottom: 56.25%;
    position: relative;
    background-color: #ccc;

    & > img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & > .delete {
      position: absolute;
      top: 3px;
      right: 3px;
      padding: 5px;
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
    }
  }

  & .talk-title {
    width: 100%;
    color: gray;
    font-size: 14px;
    font-family: VictorMono;
    background-color: white;
    margin-bottom: 5px;
  }
`;

export default FavoriteItem;
