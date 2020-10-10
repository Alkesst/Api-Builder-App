import { Project } from "api-builder-types";

const prefixUrl = "/api";

export const basicRetrieve = async<T> (route: string, config?: RequestInit): Promise<T> => {
    config = { credentials: 'include', ...(config || {})};
    const requestResult = await fetch(`${prefixUrl}${route}`, config);
    if(requestResult.status === 401) {
        // TODO redirect user to the welcome page
    }
    return requestResult.json();
};

export const retrieveProjects = async (): Promise<Project[]> => {
    return await basicRetrieve<Project[]>('/projects');
};