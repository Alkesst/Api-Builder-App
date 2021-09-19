import React from 'react';
import { login } from 'Helper/Retriever';

const Login : React.FC = () => (
    <>
        Esto es un login,
        <button type="button" onClick={login}>Click para login</button>
    </>
);

export default Login;
