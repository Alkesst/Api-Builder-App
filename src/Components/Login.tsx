import React from 'react';
import { login } from 'Helper/Retriever';

const Login: React.FC = () => (
    <div className="App App-header App-Background-Height Center-Text">
        <div className="container">
            <form>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label>Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label>Password</label>
                </div>

                <div className="checkbox mb-3">
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-muted">© 2017–2021</p>
            </form>
        </div>
        Esto es un login,
        <button type="button" onClick={login}>Click para login</button>
    </div>
);

export default Login;
