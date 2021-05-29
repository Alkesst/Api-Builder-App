import React, { useEffect, useState } from 'react';
import 'Styles/ConfigEditor/Grid.scss';
import { EditorPanel, Grid } from 'Components';
import { IEntity, IProjectConfig, ProjectType } from 'api-builder-types';
import { getProject } from '../../Helper/Retriever';

const ConfigurationEditor : React.FC = () => {
    const [, setProjectConfig] = useState<IProjectConfig>();
    const [projectEntities, setProjectEntities] = useState<IEntity[]>();
    const [expanded, setExpanded] = useState<boolean>(true);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [projectTypeLabel, setProjectTypeLabel] = useState<string>('');

    const configId = 10;

    useEffect(() => {
        if (!projectEntities && configId) {
            setLoaded(false);
            getProject()
                .then((result: IProjectConfig) => {
                    setProjectConfig(result);
                    setProjectEntities(result.Entities);
                    setLoaded(true);
                    setProjectTypeLabel(`Project Type: ${ProjectType[result.Type]}`);
                });
        }
    }, [projectEntities, configId]);

    return (
        <div className="App-Background-Height Grid">
            <Grid
                expanded={expanded}
                projectEntities={projectEntities || []}
                loaded={loaded}
                projectType={projectTypeLabel}
            />
            <EditorPanel
                expanded={expanded}
                setExpanded={setExpanded}
                projectEntities={projectEntities || []}
            />
        </div>
    );
};

export default ConfigurationEditor;
