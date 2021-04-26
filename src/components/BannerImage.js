import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';

function BannerImage(props) {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: {eq: "react-icon.png"}) {
        childImageSharp {
          fluid(maxWidth: 668) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  if (!data?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>;
  }

  return (
    <Wrapper>
      <Img
        fluid={data.placeholderImage.childImageSharp.fluid}
        imgStyle={{
          objectFit: 'contain',
          width: '100%',
          maxHeight: 668,
          animation: 'infinite-spinning 7.2s infinite',
        }}
        style={{maxHeight: 668}}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  @keyframes infinite-spinning {
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(180deg) scale(1);
    }
    100% {
      transform: rotate(360deg) scale(1);
    }
  }
`;

export default BannerImage;
