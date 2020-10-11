import React from 'react';
import { Project } from "api-builder-types";

interface ProjectViewProps extends Project {}

export const ProjectView: React.FC<ProjectViewProps> = ({Identifier, Name, Description, Type}: ProjectViewProps) => {

    return (
        <div>
            <div>Name: {Name}</div>
            <div>Type: {Type}</div>
            <div>Description: {Description}</div>
        </div>
    )
};