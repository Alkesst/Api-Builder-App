import { Project } from 'api-builder-types';

const prefixUrl = '/api';

export const basicRetrieve = async<T> (route: string, config?: RequestInit): Promise<T> => {
    const configWithCredentials: RequestInit = { credentials: 'include', ...(config || {}) };
    const requestResult = await fetch(`${prefixUrl}${route}`, configWithCredentials);
    if (requestResult.status === 401) {
        // TODO redirect user to the welcome page
    }
    return requestResult.json();
};

export const retrieveProjects = async (): Promise<Project[]> => basicRetrieve<Project[]>('/projects');

export const login = async (): Promise<void> => {
    const config: RequestInit = { method: 'POST' };
    const result = await basicRetrieve<{ userToken: string}>('/token/get', config);
    sessionStorage.setItem('userToken', result.userToken);
    window.location.assign('/');
};
