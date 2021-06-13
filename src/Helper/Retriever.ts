import { IEntity, IProject, IProjectConfig } from 'api-builder-types';

const prefixUrl = '/api';

export const baseRequest = async<T> (route: string, config?: RequestInit): Promise<T> => {
    const configWithCredentials: RequestInit = { credentials: 'include', ...(config || {}) };
    const requestResult = await fetch(`${prefixUrl}${route}`, configWithCredentials);
    if (requestResult.status === 401) {
        // TODO redirect user to the welcome page
    }
    return requestResult.json();
};

export const retrieveProjects = async (): Promise<IProject[]> => baseRequest<IProject[]>('/projects');
export const retrieveProjectConfig = async (): Promise<IEntity[]> => baseRequest<IEntity[]>('/projectConfig');
export const getProject = async (id: string) : Promise<IProjectConfig> => baseRequest<IProjectConfig>(`/projectConfig/${id}`);

export const login = async (): Promise<void> => {
    const config: RequestInit = { method: 'POST' };
    const result = await baseRequest<{ userToken: string}>('/token/get', config);
    sessionStorage.setItem('userToken', result.userToken);
    window.location.assign('/');
};
