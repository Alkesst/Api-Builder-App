import React, { useCallback, useEffect, useState } from 'react';
import 'Styles/ConfigEditor/Grid.scss';
import { EditorPanel, Grid } from 'Components';
import { useConfigurationEditorStore } from '../Stores/ConfigEditorStore';
import Modal from './MinorComponents/Modal';

const ConfigurationEditor : React.FC = () => {
    const {
        projectConfig,
        fetchProjectConfig,
        loading,
        projectType,
    } = useConfigurationEditorStore();
    const [expanded, setExpanded] = useState<boolean>(true);
    const [edit, setEdit] = useState<boolean>(false);
    const [entityId, setEntityId] = useState<string>();

    const configId = '36e20bb4-aa8e-4ee6-8c10-dddd26b6e76a';

    const setEntityCallback = useCallback(
        (selectedEntityId: string) => setEntityId(selectedEntityId),
        [setEntityId],
    );

    const setEditCallback = (value: boolean) => setEdit(value);

    useEffect(() => {
        if (!projectConfig && configId) {
            fetchProjectConfig(configId);
        }
    }, [projectConfig, fetchProjectConfig, configId]);

    return (
        <div className="App-Background-Height Grid">
            {entityId && <Modal showing={edit} setShowing={setEdit} entityId={entityId} />}
            <Grid
                expanded={expanded}
                loading={loading}
                projectType={`Project Type ${projectType}`}
                setEntityId={setEntityCallback}
                setEdit={setEditCallback}
            />
            <EditorPanel
                expanded={expanded}
                setExpanded={setExpanded}
                projectEntities={projectConfig?.Entities || []}
                setEntityId={setEntityCallback}
                setEdit={setEditCallback}
            />
        </div>
    );
};

export default ConfigurationEditor;
