import React from 'react';
import Navbar from 'react-bootstrap/cjs/Navbar';
import Nav from 'react-bootstrap/cjs/Nav';

const StickyNav = () => {
    const jose = 'Features';

    const generateFront = () => {
        const hasSession = sessionStorage.getItem('userToken');
        return (hasSession) ? (<Nav.Link href="#features">{jose}</Nav.Link>) : (<Nav.Link href="/login"> Login </Nav.Link>);
    };

    return (
        <>
            <Navbar bg="dark" sticky="top" expand="lg" className="navbar-dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand href="#home">
                    <img
                        src="/esplota.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {generateFront()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default StickyNav;
