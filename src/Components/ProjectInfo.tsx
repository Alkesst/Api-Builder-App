import { getProjectInfo, saveProjectInfo } from "Helper/Retriever";
import React, { ChangeEvent, useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IProject } from "../../../api-builder-types";

interface RouteParams {
    id: string;
}

const ProjectInfo: React.FC = () => {
    const { id } = useParams<RouteParams>();
    const [project, setProject] = useState<IProject>();
    const [loading, setLoading] = useState<boolean>(false);
    const [editing, setEtiding] = useState<boolean>(false);
    const history = useHistory();

    const handleClick = () => {
        history.push(`/project/editor/${id}`);
    }

    useEffect(() => {
        if(!project) {
            setLoading(true);
            getProjectInfo(id).then((result) => {
                setProject(result);
                setLoading(false);
            });
        }
    }, [setLoading, id, project]);

    const editingCallback = useCallback((value: boolean) => setEtiding(value), [setEtiding]);
    const handleEdit = (e: ChangeEvent<any>, fieldName: keyof IProject) => {
        if(project) {
            setProject({ ...project, [fieldName]: e.target.value});
        }
    }
    const handleSave = () => {
        saveProjectInfo(project!!).then(() => {
            console.log('OK');
            setLoading(false);
            setEtiding(false);
        });
    }

    return (
        <div className="App App-Background text-gainsboro projects-container-align">
            {!loading && 
                <div>
                    <div className="flex justify-content-between align-items-center padding-right-15">
                        <h1 className="padding-top-15 padding-left-15">Project</h1>
                        <div>
                            <button onClick={() => editingCallback(true)}>
                                Edit
                            </button>
                            <button>
                                Download
                            </button>
                            <button onClick={handleClick}>
                                Update Config
                            </button>
                        </div>
                    </div>
                    <div className="App-Background App-Background-Height-Title text-gainsboro padding-left-15 padding-right-15">
                        <div className="padding-top-15">
                            <h3>
                                {!editing && project?.Name}
                                {editing && <input value={project?.Name} onChange={(e) => handleEdit(e, 'Name')} />}
                            </h3>
                            <h5>
                                {!editing && project?.Type}
                                {editing && <select
                                        value={project?.Type}
                                        onChange={(e) => handleEdit(e, 'Type')}>
                                        <option value="Relational">
                                            Relational
                                        </option>
                                        <option value="NoRelational">
                                            No Relational
                                        </option>
                                    </select>}
                            </h5>
                            <p className="description">
                                {!editing && project?.Description}
                                {editing && <textarea value={project?.Description} onChange={(e) => handleEdit(e, 'Description')} />}
                            </p>
                        </div>
                        {editing && <button onClick={handleSave}>Save</button>}
                    </div>
                </div>
            }
        </div>
    )
};

export default ProjectInfo;