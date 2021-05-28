import React, { useEffect, useState } from 'react';
import 'Styles/ConfigEditor/Grid.scss';
import { EditorPanel, Grid } from 'Components';
import { IEntity, IProjectConfig } from 'api-builder-types';
import { getProject } from '../../Helper/Retriever';

const ConfigurationEditor : React.FC = () => {
    const [projectConfig, setProjectconfig] = useState<IProjectConfig>();
    const [projectEntities, setProjectEntities] = useState<IEntity[]>();
    const [expanded, setExpanded] = useState<boolean>(true);
    const [loaded, setLoaded] = useState<boolean>(false);

    const configId = 10;

    useEffect(() => {
        if (!projectEntities && configId) {
            setLoaded(false);
            getProject()
                .then((result: IProjectConfig) => {
                    setProjectconfig(result);
                    setProjectEntities(result.Entities);
                    setLoaded(true);
                });
        }
    }, [projectEntities, configId]);

    return (
        <div className="App-Background-Height Grid">
            <Grid
                expanded={expanded}
                projectEntities={projectEntities || []}
                loaded={loaded}
                projectType={projectConfig?.Type}
            />
            <EditorPanel expanded={expanded} setExpanded={setExpanded} />
        </div>
    );
};

export default ConfigurationEditor;
