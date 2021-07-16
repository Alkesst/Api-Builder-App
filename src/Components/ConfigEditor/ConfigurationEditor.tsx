import React, { useCallback, useEffect, useState } from 'react';
import 'Styles/ConfigEditor/Grid.scss';
import { EditorPanel, Grid } from 'Components';
import { useConfigurationEditorStore, useEntityStore } from '../Stores/ConfigEditorStore';
import Modal from './MinorComponents/Modal';
import { deleteEntity } from 'Helper/Retriever';

const ConfigurationEditor : React.FC = () => {
    const {
        projectConfig,
        fetchProjectConfig,
        loading,
        projectType,
    } = useConfigurationEditorStore();
    const { deleteEntity: deleteEntityFromState } = useEntityStore();
    const [expanded, setExpanded] = useState<boolean>(true);
    const [edit, setEdit] = useState<boolean>(false);
    const [entityState, setEntityState] = useState<{entityId: string, deleted: boolean}>({entityId: '', deleted: true});

    const configId = '36e20bb4-aa8e-4ee6-8c10-dddd26b6e76a';

    const setEntityCallback = useCallback(
        (selectedEntityId: string) => setEntityState({entityId: selectedEntityId, deleted: false}),
        [setEntityState],
    );

    const setEditCallback = (value: boolean) => setEdit(value);
    const setDeleted = () => {
        deleteEntity(entityState.entityId).then(() => deleteEntityFromState(entityState.entityId));
        setEntityState({...entityState, deleted: true});
    }

    useEffect(() => {
        if (!projectConfig && configId) {
            fetchProjectConfig(configId);
        }
    }, [projectConfig, fetchProjectConfig, configId]);

    return (
        <div className="App-Background-Height Grid">
            {entityState && !entityState.deleted && <Modal showing={edit} setShowing={setEdit} entityId={entityState.entityId} setDeleted={setDeleted} />}
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
