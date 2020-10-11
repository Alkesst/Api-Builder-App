import React from 'react';
import { Project } from 'api-builder-types';

interface ProjectViewProps extends Project {}

const ProjectView: React.FC<ProjectViewProps> = ({
    Name,
    Description,
    Type
}: ProjectViewProps) => (
    <div>
        <div>
            Name:
            {Name}
        </div>
        <div>
            Type:
            {Type}
        </div>
        <div>
            Description:
            {Description}
        </div>
    </div>
);

export default ProjectView;
