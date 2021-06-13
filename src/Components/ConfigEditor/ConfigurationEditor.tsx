import React, { useEffect, useState } from 'react';
import 'Styles/ConfigEditor/Grid.scss';
import { EditorPanel, Grid } from 'Components';
import { useConfigurationEditorStore } from '../Stores/ConfigEditorStore';

const ConfigurationEditor : React.FC = () => {
    const {
        projectConfig,
        fetchProjectConfig,
        loading,
        projectType,
    } = useConfigurationEditorStore();
    const [expanded, setExpanded] = useState<boolean>(true);

    const configId = '36e20bb4-aa8e-4ee6-8c10-dddd26b6e76a';

    useEffect(() => {
        if (!projectConfig && configId) {
            fetchProjectConfig(configId);
        }
    }, [projectConfig, fetchProjectConfig, configId]);

    return (
        <div className="App-Background-Height Grid">
            <Grid
                expanded={expanded}
                projectEntities={projectConfig?.Entities || []}
                loading={loading}
                projectType={`Project Type ${projectType}`}
            />
            <EditorPanel
                expanded={expanded}
                setExpanded={setExpanded}
                projectEntities={projectConfig?.Entities || []}
            />
        </div>
    );
};

export default ConfigurationEditor;
