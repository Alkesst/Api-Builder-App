import React, { useState } from 'react';
import { Project } from 'api-builder-types';
import Button from 'react-bootstrap/cjs/Button';
import Collapse from 'react-bootstrap/cjs/Collapse';
import Container from 'react-bootstrap/cjs/Container';
import Row from 'react-bootstrap/cjs/Row';
import Col from 'react-bootstrap/cjs/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

interface ProjectViewProps extends Project {}

const ProjectView: React.FC<ProjectViewProps> = ({
    Name,
    Description,
    Type,
}: ProjectViewProps) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <Container>
                <Row>
                    <Col sm={8}>
                        {Name}
                    </Col>
                    <Col sm={4}>
                        <Button
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >
                            <FontAwesomeIcon icon={faAngleDown} />
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Collapse in={open}>
                <div>
                    <div id="example-collapse-text">
                        Type:
                        {` ${Type}`}
                    </div>
                    <div>
                        Description:
                        {` ${Description}`}
                    </div>
                </div>
            </Collapse>
        </>
    );
};

export default ProjectView;
