import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../Helper/Retriever';

const Login : React.FC = () => {
    const [logged, setLogged] = useState<boolean>(false);
    const loginHandler = () => {
        login().then(() => {
            setLogged(true);
        });
    };
    useEffect(() => {
        setLogged(sessionStorage.getItem('userToken') !== null);
    }, [logged]);

    return (
        <>
            esto es un puto login,
            <button type="button" onClick={loginHandler}>Click aqui anda puta zorra</button>
            {(logged) ? <Redirect to="/" /> : <></>}
        </>
    );
};

export default Login;
