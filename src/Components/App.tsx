import React from 'react';
import 'Styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { injectStyle } from "react-toastify/dist/inject-style";

if (typeof window !== "undefined") {
    injectStyle();
}

const App = () => (
    <div className="App App-header App-Background-Height Center-Text">
        HO-LA!
    </div>
);

export default App;
