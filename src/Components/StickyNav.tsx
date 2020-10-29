import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/cjs/Navbar';
import Nav from 'react-bootstrap/cjs/Nav';

const StickyNav: React.FC = () => {
    const jose = 'Features';
    const [userToken, setUserToken] = useState(sessionStorage.getItem('userToken'));

    useEffect(() => {}, [userToken]);

    const logOut = () => {
        sessionStorage.removeItem('userToken');
        setUserToken(null);
    };

    const generateLogOutButton = () => (
        (userToken) ? <Nav><Nav.Link onClick={logOut}> Log Out </Nav.Link></Nav> : (<> </>)
    );

    const generateButtonsForLoggedUsers = () => (
        <>
            <Nav.Link href="/features">{jose}</Nav.Link>
        </>
    );

    const generateButtons = () => {
        const hasSession = sessionStorage.getItem('userToken');
        return (hasSession) ? generateButtonsForLoggedUsers() : (<Nav.Link href="/login"> Login </Nav.Link>);
    };

    return (
        <>
            <Navbar bg="dark" sticky="top" expand="lg" className="navbar-dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand href="/">
                    <img
                        src="/esplota.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        {generateButtons()}
                        {generateLogOutButton()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default StickyNav;
