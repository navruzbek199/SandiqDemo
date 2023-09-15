import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/noty/lib/noty.css";  
import "../node_modules/noty/lib/themes/mint.css";
import 'react-select-search/style.css'


const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>loading...</h3>
  </div>
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Suspense>
);
serviceWorkerRegistration.unregister();
reportWebVitals();

