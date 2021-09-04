import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IProject, ProjectType } from 'api-builder-types';
import { retrieveProjects } from 'Helper/Retriever';
import { ProjectView } from 'Components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { newGuidString } from 'Helper/GuidHelper';

const ProjectsView : React.FC = () => {
    const [projects, setProjects] = useState<IProject[]>();
    const [fetching, setFetching] = useState<boolean>(false);
    const [searching, setSearching] = useState<boolean>(false);
    const [filterValue, setFilterValue] = useState<string>('');
    const filteredProjects = useMemo<IProject[] | undefined>(() => {
        if(filterValue === '' || !filterValue) {
            return projects;
        }
        const filterValueLower = filterValue.toLocaleLowerCase();
        return projects?.filter((e: IProject) => e.Name.toLowerCase().includes(filterValueLower) || e.Type.toString().toLocaleLowerCase().includes(filterValueLower));
    }, [filterValue, projects]);

    useEffect(() => {
        if (!projects) {
            setFetching(true);
            retrieveProjects().then((result: IProject[]) => {
                setProjects(result);
                setFetching(false);
            });
        }
    }, [projects]);

    const addProject = useCallback(() => { 
        const newProject = {Description: 'New Project', Identifier: newGuidString(), Type: ProjectType.Relational, Name: 'New Project'};
        setProjects([...(projects!), newProject]);
    }, [projects]);

    return (
        <div className="App App-Background text-gainsboro projects-container-align">
            <div className="flex justify-content-between align-items-center padding-right-15">
                <h1 className="padding-top-15 padding-left-15">Projects</h1>
                <div>
                    <button className="btn square btn-outline-light" onClick={addProject}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <FontAwesomeIcon icon={faSearch} onClick={(e) => setSearching(!searching)} className="margin-left-15" />
                    {searching && <input value={filterValue} className="margin-left-15" onChange={(e) => setFilterValue(e.target.value)} />}
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
