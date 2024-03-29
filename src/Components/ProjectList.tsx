import React from 'react';
import { IProject } from 'api-builder-types';

import '../Styles/Projects.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

interface ProjectViewProps extends IProject {}

const ProjectList: React.FC<ProjectViewProps> = ({
    Name,
    Description,
    Type,
    Identifier
}: ProjectViewProps) => {

    const history = useHistory();

    const handleClick = (projectId: string) => {
        history.push(`project/${projectId}`);
    };

    return (
        <div className="project-container margin-bot-15">
            <div className="flex justify-content-between align-items-center">
                <div>
                    <div className="padding-right">
                        {Name}
                    </div>
                    <h6 className="grey-text">
                        {Type}
                    </h6>
                </div>
                <button className="btn square btn-outline-light" onClick={() => handleClick(Identifier)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <div className="description">
                {Description}
            </div>
        </div>
    );
};

export default ProjectList;
