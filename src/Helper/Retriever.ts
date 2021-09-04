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
export const deleteEntity = async (id: string): Promise<void> => {
    const config: RequestInit = {method: 'delete'};
    baseRequest(`/entity/${id}`, config);
};
export const saveEntity = async (payload: IEntity): Promise<void> => {
    const config: RequestInit = {method: 'post', body: JSON.stringify(payload)};
    baseRequest(`/entity`, config);
};
export const saveProjectInfo = async (payload: IProject): Promise<void> => {
    const config: RequestInit = {method: 'post', body: JSON.stringify(payload)};
    baseRequest(`/project`, config);
};
export const getProjectInfo = async (id: string): Promise<IProject> => baseRequest<IProject>(`/project/${id}`);
export const getExportedProject = async (id: string): Promise<any> => {
    const result = fetch(`${prefixUrl}/project/${id}/export`);
    result.then((response: any) => response.blob())
    .then((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const downloadHandlerElement = document.createElement('a');
        downloadHandlerElement.href = url;
        downloadHandlerElement.download = 'config.json';
        document.body.appendChild(downloadHandlerElement);
        downloadHandlerElement.click();
        downloadHandlerElement.remove();
    });
};
export const getProjectPackage = async (id: string): Promise<any> => {
    const result = fetch(`${prefixUrl}/project/${id}/package`);
    result.then((response: any) => response.blob())
    .then((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const downloadHandlerElement = document.createElement('a');
        downloadHandlerElement.href = url;
        downloadHandlerElement.download = 'package.zip';
        document.body.appendChild(downloadHandlerElement);
        downloadHandlerElement.click();
        downloadHandlerElement.remove();
    });
};

export const login = async (): Promise<void> => {
    const config: RequestInit = { method: 'POST' };
    const result = await baseRequest<{ userToken: string}>('/token/get', config);
    sessionStorage.setItem('userToken', result.userToken);
    window.location.assign('/');
};
