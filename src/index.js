import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { IntlProvider } from 'react-intl';



//Importar traducciones manuales
import LocaleEsMessages from "./locales/es" 
import LocaleEnMessages from "./locales/en"

//Variables que representan el idioma
var lang = ''
var traduccionManual=LocaleEsMessages

//Traer idioma del browser
function getBrowserLanguage(){
  lang=navigator.language
  if(lang.includes('es')){
    traduccionManual=LocaleEsMessages;
  }
  else{
    traduccionManual=LocaleEnMessages;
  }
}

getBrowserLanguage()

ReactDOM.render(
  <IntlProvider locale={lang} messages={traduccionManual}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </IntlProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
