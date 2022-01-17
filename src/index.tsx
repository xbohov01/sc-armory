import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import '@fontsource/exo'

const theme:any = extendTheme({
  fonts: {
    heading: 'Exo',
    switch: 'Exo',
    tab: 'Exo'
  },
  components: {
    Tab: {
      baseStyle: {    
        _selected: {
          backgroundColor: '#1a2130',
        },
      },
    },
  },
})

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
reportWebVitals();
