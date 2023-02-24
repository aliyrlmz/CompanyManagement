import axios, { AxiosResponse } from 'axios';
import { Company } from '../models/company';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;
const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Companies = {
    list: () => requests.get<Company[]>('/companies'),
    details: (id: number) => requests.get<Company>(`/companies/${id}`),
    create: (company: Company) => axios.post<void>('/companies', company),
    update: (company: Company) => axios.put<void>(`/companies/${company.id}`, company),
    delete: (id: number) => axios.delete<void>(`/companies/${id}`)
}

const agent = {
    Companies
}

export default agent;