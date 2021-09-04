import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ChangeEvent } from "react";
import { IProject } from "../../../api-builder-types";

interface EditProjectProps {
    project: IProject | undefined;
    setProject: (project: IProject) => void;
    handleSave: () => void;
}

const EditProject: React.FC<EditProjectProps> = ({project, setProject, handleSave}: EditProjectProps) => {
    const handleEdit = (e: ChangeEvent<any>, fieldName: keyof IProject) => {
        if(project) {
            setProject({ ...project, [fieldName]: e.target.value});
        }
    }

    return (
        <div className="App-Background App-Background-Height-Title text-gainsboro padding-left-15 padding-right-15">
            <div className="padding-top-15">
                <h3>
                    <input value={project?.Name} onChange={(e) => handleEdit(e, 'Name')} />
                </h3>
                <h5>
                    <select
                        value={project?.Type}
                        onChange={(e) => handleEdit(e, 'Type')}>
                        <option value="Relational">
                            Relational
                        </option>
                        <option value="NoRelational">
                            No Relational
                        </option>
                    </select>
                </h5>
                <p>
                    <textarea value={project?.Description} onChange={(e) => handleEdit(e, 'Description')} />
                </p>
                <button onClick={handleSave} className="btn square btn-outline-light">
                    <FontAwesomeIcon icon={faSave} />
                </button>
            </div>
        </div>
    )
};

export default EditProject;