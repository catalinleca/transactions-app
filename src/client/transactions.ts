import Base, { IBase } from "./base";
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export type Transaction = {
  user_id: string;
  timestamp: string;
  currency: string;
  amount: string;
};

export interface ITransactionsClient extends IBase<Transaction> {
  getLarge: (
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<Transaction[]>>;

  getMedium: (
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<Transaction[]>>;

  getSmall: (
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<Transaction[]>>;
}

enum TransactionsEnum {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large"
}

export type TransactionsTypes = "small" | "medium" | "large";

class TransactionsClient
  extends Base<Transaction>
  implements ITransactionsClient
{
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance, "transactions");
  }

  async getLarge(
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Transaction[]>> {
    const response = await this.getTransactions(TransactionsEnum.LARGE, config);

    // probably some extra validation

    return response;
  }

  async getMedium(
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Transaction[]>> {
    const response = await this.getTransactions(
      TransactionsEnum.MEDIUM,
      config
    );

    // probably some extra validation

    return response;
  }

  async getSmall(
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Transaction[]>> {
    const response = await this.getTransactions(TransactionsEnum.SMALL, config);

    // probably some extra validation

    return response;
  }
}

export default TransactionsClient;
