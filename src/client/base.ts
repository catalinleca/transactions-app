import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { TransactionsTypes } from "./transactions";

export interface IBase<T> {
  axiosInstance: AxiosInstance;
  url: string;

  getTransactions(
    type: TransactionsTypes,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T[]>>;
}

class Base<T> implements IBase<T> {
  constructor(public axiosInstance: AxiosInstance, public url: string) {}

  async getTransactions(
    type: TransactionsTypes,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T[]>> {
    const response = await this.axiosInstance.get<T[]>(
      `${this.url}-${type}.json`,
      config
    );

    // probably some extra validation

    return response;
  }
}

export default Base;
