import axios, { AxiosDefaults, AxiosInstance, AxiosRequestConfig } from "axios";
import TransactionsClient, { ITransactionsClient } from "./transactions";

interface IApiClient {
  readonly transactions: ITransactionsClient;
}

class ApiClient implements IApiClient {
  private readonly axiosInstance: AxiosInstance;
  public readonly transactions: ITransactionsClient;

  constructor(axiosConfig?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      timeout: 1000,
      ...axiosConfig
    });

    this.transactions = new TransactionsClient(this.axiosInstance);
  }

  public getDefaults = () => this.axiosInstance.defaults;

  public setDefaults = (defaults: AxiosDefaults) =>
    (this.axiosInstance.defaults = defaults);
}

export default ApiClient;
