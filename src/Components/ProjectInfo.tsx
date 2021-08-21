import { faDownload, faEdit, faFileExport, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getProjectInfo, saveProjectInfo } from "Helper/Retriever";
import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { IProject } from "../../../api-builder-types";
import EditProject from "./EditProject";

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

    const handleSave = () => {
        saveProjectInfo(project!!).then(() => {
            setLoading(false);
            toast.dark("The project has been saved!", {position: "bottom-right"});
            setEtiding(false);
        });
    }

    return (
        <div className="App App-Background text-gainsboro projects-container-align">
            {!loading && 
                <div>
                    <div className="flex justify-content-between align-items-center padding-right-15">
                        <h1 className="padding-top-15 padding-left-15">Project</h1>
                        <div className="btn-group">
                            <button onClick={() => editingCallback(true)} className="btn btn-outline-light" title="Edit Project">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                            <button className="btn btn-outline-light" title="Download Package">
                                <FontAwesomeIcon icon={faDownload} />
                            </button>
                            <button className="btn btn-outline-light" title="Export Configuration">
                                <FontAwesomeIcon icon={faFileExport} />
                            </button>
                            <button onClick={handleClick} className="btn btn-outline-light" title="Update Configuration">
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                        </div>
                    </div>
                    {!editing && <div className="App-Background App-Background-Height-Title text-gainsboro padding-left-15 padding-right-15">
                        <div className="padding-top-15">
                            <h3>
                                {project?.Name}
                            </h3>
                            <h5>
                                {project?.Type}
                            </h5>
                            <p className="description">
                                {project?.Description}
                            </p>
                        </div>
                    </div>}
                    {editing && <EditProject project={project} setProject={setProject} handleSave={handleSave} />}
                    <ToastContainer />
                </div>
            }
        </div>
    )
};

export default ProjectInfo;