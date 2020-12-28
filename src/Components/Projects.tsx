import React, { useEffect, useState } from 'react';
import { Project } from 'api-builder-types';
import { retrieveProjects } from 'Helper/Retriever';
import { ProjectView } from 'Components';

const ProjectsView : React.FC = () => {
    const [projects, setProjects] = useState<Project[]>();
    const [fetching, setFetching] = useState<boolean>(false);

    useEffect(() => {
        if (!projects) {
            setFetching(true);
            retrieveProjects().then((result: Project[]) => {
                setProjects(result);
                setFetching(false);
            });
        }
    }, [projects]);

    return (
        <div className="App">
            <div className="App-header App-Background-Height">
                {fetching && <div>Loading...</div>}
                {projects && projects.map((project) => (
                    <ProjectView
                        key={project.Identifier.toString()}
                        Identifier={project.Identifier}
                        Description={project.Description}
                        Name={project.Name}
                        Type={project.Type}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectsView;
