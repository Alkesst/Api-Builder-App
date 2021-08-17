import React, { ChangeEvent, useEffect, useState } from 'react';
import { IProject } from 'api-builder-types';
import { retrieveProjects } from 'Helper/Retriever';
import { ProjectView } from 'Components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const ProjectsView : React.FC = () => {
    const [projects, setProjects] = useState<IProject[]>();
    const [fetching, setFetching] = useState<boolean>(false);
    const [filteredProjects, setFilteredProjects] = useState<IProject[]>();

    useEffect(() => {
        if (!projects) {
            setFetching(true);
            retrieveProjects().then((result: IProject[]) => {
                setProjects(result);
                setFilteredProjects(result);
                setFetching(false);
            });
        }
    }, [projects]);


    const handleFiltering = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.value === '' || !event.target.value) {
            setFilteredProjects(projects); 
            return;
        }
        const a = filteredProjects?.filter((e: IProject) => e.Name.includes(event.target.value) || e.Type.toString().includes(event.target.value));
        setFilteredProjects(a);
    }

    return (
        <div className="App App-Background text-gainsboro projects-container-align">
            <div className="flex justify-content-between align-items-center padding-right-15">
                <h1 className="padding-top-15 padding-left-15">Projects</h1>
                <div>
                    <FontAwesomeIcon icon={faSearch} title="Mandatory"/>
                    <input className="margin-left-15" onChange={(e) => handleFiltering(e)} />
                </div>
            </div>
            <div className="App-header App-Background-Height-Title Center-Content padding-top-15">
                {fetching && <div>Loading...</div>}
                {filteredProjects && filteredProjects.map((project) => (
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
