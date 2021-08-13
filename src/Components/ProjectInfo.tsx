import React from "react";
import { useParams } from "react-router-dom";

interface RouteParams {
    id: string;
}

const ProjectInfo: React.FC = () => {
    const { id } = useParams<RouteParams>();

    return (
        <div className="App-Background App-Background-Height text-white">
            <div className="padding-top-15">
                HI! {id}
            </div>
        </div>
    )
};

export default ProjectInfo;