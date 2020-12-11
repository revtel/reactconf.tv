import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import Img from 'gatsby-image';

function BannerImage(props) {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: {eq: "reactjs.png"}) {
        childImageSharp {
          fluid(maxWidth: 1600) {
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
    <Img
      fluid={data.placeholderImage.childImageSharp.fluid}
      style={{objectFit: 'cover', width: '100%', maxHeight: 668}}
    />
  );
}

export default BannerImage;
