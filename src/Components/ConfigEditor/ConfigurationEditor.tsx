import React, { useEffect, useState } from 'react';
import 'Styles/ConfigEditor/Grid.scss';
import { EditorPanel, Grid } from 'Components';
import { IEntity } from 'api-builder-types';
import { retrieveProjectConfig } from '../../Helper/Retriever';

const ConfigurationEditor : React.FC = () => {
    const [projectEntities, setProjectEntities] = useState<IEntity[]>();
    const [expanded, setExpanded] = useState<boolean>(true);
    const configId = 10;

    useEffect(() => {
        if (!projectEntities && configId) {
            retrieveProjectConfig()
                .then((result: IEntity[]) => setProjectEntities(result));
        }
    }, [projectEntities, configId]);

    return (
        <div className="App-Background-Height Grid">
            <Grid expanded={expanded} projectEntities={projectEntities || []} />
            <EditorPanel expanded={expanded} setExpanded={setExpanded} />
        </div>
    );
};

export default ConfigurationEditor;
