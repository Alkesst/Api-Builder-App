import React from 'react';
import 'Styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { injectStyle } from "react-toastify/dist/inject-style";
import '../Styles/layout.scss';

if (typeof window !== "undefined") {
    injectStyle();
}

const App = () => (
    <div className="App App-header App-Background-Height Center-Text">
        <div className="padding-top-50">
            <div className=" p-4 p-md-5 mb-4 text-white rounded bg-dark container">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 fst-italic">API Builder</h1>
                    <p className="lead my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente doloremque illum vel pariatur perferendis dignissimos dicta libero est! Qui explicabo ipsam enim commodi ducimus, vero facilis aperiam vitae ullam. Rerum.</p>
                </div>
            </div>
            <div className="h-100 p-5 text-white bg-dark rounded-3 container">
                <div className="row">
                    <div className="col-4">
                        <h2>Relational Database Design</h2>
                        <p>You can create your own database designs with </p>
                    </div>
                    <div className="col-8">
                    <img src="/e.png" height="393px" width="686px"></img>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default App;
