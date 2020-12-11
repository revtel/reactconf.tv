/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import {AppRoot, PageContainer} from './src/PageContainer';

export const wrapPageElement = ({element, props}) => {
  return <PageContainer {...props}>{element}</PageContainer>;
};

export const wrapRootElement = ({element}) => {
  return <AppRoot>{element}</AppRoot>;
};
