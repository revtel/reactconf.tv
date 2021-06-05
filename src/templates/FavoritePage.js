import React from 'react';
import {navigate} from 'gatsby';
import styled from 'styled-components';
import * as AppContext from '../AppContext';
import useDimension from '../hooks/use-dimension';
import NavBar from '../components/NavBar';
import FavoriteItem from '../components/FavoriteItem';

function FavoritePage(props) {
  const app = React.useContext(AppContext.Context);
  const favorites = app.favoriteCache || [];
  const {dimension} = useDimension();

  function calcGridLayout() {
    if (!dimension) {
      return null;
    }

    const margin = 20 * 2;
    const gutter = 20;
    const width = dimension.innerWidth < 1024 ? dimension.innerWidth : 1024;
    let itemPerRow = 1;

    if (width > 720) {
      itemPerRow = 3;
    } else if (width > 400) {
      itemPerRow = 2;
    }

    const r = favorites.length % itemPerRow;
    const gridItems =
      r === 0
        ? favorites
        : [
            ...favorites,
            ...Array.from({length: itemPerRow - r}).map((_) => null),
          ];

    return {
      itemPerRow,
      itemWidth: (width - margin - (itemPerRow - 1) * gutter) / itemPerRow,
      items: gridItems,
    };
  }

  const gridLayout = calcGridLayout();

  return (
    <Wrapper>
      <NavBar
        explicitTitle="My Favorite Talks"
        onBackClick={() => navigate('/')}
      />

      {gridLayout && (
        <div className="content">
          {gridLayout.items.map((fav, idx) => (
            <FavoriteItem
              key={idx}
              item={fav}
              style={{width: gridLayout.itemWidth}}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #4c4c4c;

  & > .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 3;
  }

  & > .content {
    padding: 80px 20px;
    min-height: 100vh;
    max-width: 1024px;
    margin: 0px auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

export default FavoritePage;
