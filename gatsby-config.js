const gtagId = 'G-RXJNC5MZMF';

let gatsbyConfig = {
  siteMetadata: {
    title: `ReactConf.TV`,
    description: `Collect React conferences all over the world!`,
    author: `ReactConf.TV`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ReactConf.tv`,
        short_name: `ReactConf.tv`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-styled-components`,
  ],
};

if (gtagId) {
  gatsbyConfig.plugins.push({
    resolve: `gatsby-plugin-google-gtag`,
    options: {
      trackingIds: [gtagId],
    },
  });
}

module.exports = gatsbyConfig;
