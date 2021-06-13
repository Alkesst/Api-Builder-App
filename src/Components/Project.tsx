import React, { useState } from 'react';
import { IProject } from 'api-builder-types';
import Button from 'react-bootstrap/cjs/Button';
import Collapse from 'react-bootstrap/cjs/Collapse';
import Container from 'react-bootstrap/cjs/Container';
import Row from 'react-bootstrap/cjs/Row';
import Col from 'react-bootstrap/cjs/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

interface ProjectViewProps extends IProject {}

const Project: React.FC<ProjectViewProps> = ({
    Name,
    Description,
    Type,
}: ProjectViewProps) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Container className="text-left mb-3">
                <Row className="text-left">
                    <Col sm={8}>
                        {Name}
                    </Col>
                    <Col sm={4} className="text-right">
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >
                            <FontAwesomeIcon icon={(!open) ? faAngleDown : faAngleUp} />
                        </Button>
                    </Col>
                </Row>
                <Collapse in={open} className="text-left">
                    <div>
                        <div id="example-collapse-text" className="mb-2 mt-2">
                            Type:
                            <br />
                            {` ${Type}`}
                        </div>
                        <div>
                            Description:
                            <br />
                            {` ${Description}`}
                        </div>
                    </div>
                </Collapse>
            </Container>
        </>
    );
};

export default Project;
