import React, { useEffect, useState } from 'react';
import '../Styles/App.css';
import { Project } from "api-builder-types";
import { retrieveProjects } from "../Helper/Retriever";
import { ProjectView } from "./ProjectView";

const App = () => {
    const [projects, setProjects] = useState<Project[]>();
    const [fetching, setFetching] = useState<boolean>(false);

    useEffect(() => {
        if(!projects) {
            setFetching(true);
            retrieveProjects().then((result: Project[]) => {
                setProjects(result);
                setFetching(false);
            });
        }
    }, [projects]);

    return (
        <div className="App">
            <header className="App-header">
                {fetching && <div>Loading...</div>}
                {projects && projects.map(project => (
                    <div key={project.Identifier.toString()}>
                        <ProjectView
                            Identifier={project.Identifier}
                            Description={project.Description}
                            Name={project.Name}
                            Type={project.Type}
                        />
                    </div>
                ))}
            </header>
        </div>
      );
};

export default App;
