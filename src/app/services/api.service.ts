import axios, { AxiosRequestConfig, AxiosStatic, AxiosInstance } from 'axios';

const baseUrl = `https://recrutamento-linkedby.herokuapp.com/`;

export class ApiService {
  private config: AxiosRequestConfig;
  private instance: AxiosInstance;
  private storage: Storage = window.sessionStorage;
  private tokenExpires = 30; // Expires em 30 minutes

  constructor() {
    this.config = { baseURL: baseUrl };
    this.instance = axios.create(this.config);
    this.setRequestInterceptor();
    this.setResponseInterceptor();
  }

  public getInstance = (): AxiosInstance => this.instance;

  private setResponseInterceptor(): void {
    this.instance.interceptors.response.use(
      (response) => {
        if (response.data.hasOwnProperty('token')) {
          this.setToken(response.data.token);
        }
        if (response.headers.hasOwnProperty('authorization')) {
          this.setToken(response.headers.authorization);
        }
        return response;
      },
      (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          this.storage.removeItem('token');
          this.storage.removeItem('tokenExpires');
        } else {
          throw error;
        }
      }
    );
  }

  private setRequestInterceptor(): void {
    this.instance.interceptors.request.use(
      (config) => {
        let tokenExpires = this.storage.getItem('tokenExpires');
        if (tokenExpires && !this.isDateExpired(tokenExpires)) {
          config.headers.Authorization = this.storage.getItem('token');
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private setToken(token: string) {
    this.storage.setItem('token', token);
    let date = new Date();
    date.setMinutes(date.getMinutes() + this.tokenExpires);
    this.storage.setItem('tokenExpires', date.toISOString());
  }

  private isDateExpired(date: string): boolean {
    return new Date() > new Date(date);
  }
}
