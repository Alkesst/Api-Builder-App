import React, { useState } from 'react';
import 'Styles/ConfigEditor/Grid.scss';
import { EditorPanel, Grid } from 'Components';

const ConfigurationEditor : React.FC = () => {
    const [expanded, setExpanded] = useState<boolean>(true);
    return (
        <div className="App-Background-Height Grid">
            <Grid expanded={expanded} />
            <EditorPanel expanded={expanded} setExpanded={setExpanded} />
        </div>
    );
};

export default ConfigurationEditor;
