import React from 'react';
import {useOutletSetter} from 'reconnect.js';
import '../index.css';
import ActivityIndicator from './ActivityIndicator';
import Toast from './Toast';
import Modal from './Modal';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Layout({children, location}) {
  const showSpinner = useOutletSetter('spinner');

  React.useEffect(() => {
    async function onPageMounted() {
      if (['/', '/favorites'].indexOf(location?.pathname) > -1) {
        showSpinner(true);
        await delay(600);
        showSpinner(false);
        if (typeof window !== 'undefined') {
          window.scrollTo({top: 0, behavior: 'smooth'});
        }
      }
    }

    onPageMounted();
  }, [showSpinner, location?.pathname]);

  return (
    <main>
      {children}
      <ActivityIndicator />
      <Toast />
      <Modal />
    </main>
  );
}

export default Layout;
