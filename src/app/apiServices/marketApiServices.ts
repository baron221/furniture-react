import axios from "axios";
import assert from "assert";
import { serviceApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Market } from "../../types/user";
import { SearchObj } from "../../types/others";

class MarketApiService {
  private readonly path: string;
  constructor() {
    this.path = serviceApi
  }

  async getPeakMarkets() {
    try {
      const url = '/markets?order=top&page=1&limit=4';
      const result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result, Definer.general_err2);
      console.log('state::', result.data.state);
      const peak_markets: Market[] = result.data.data;
      return peak_markets;
    } catch (err: any) {
      console.log(`ERROR::: getPeakMARKET ${err.message}`);
      throw err;
    }


  }
  async getMarkets(data: SearchObj) {
    try {
      const url = `/markets?order=${data.order}&page=${data.page}&limit=${data.limit}`;
      const result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result, Definer.general_err2);
      console.log('state::', result.data.state);
      const markets: Market[] = result.data.data;
      return markets;
    } catch (err: any) {
      console.log(`ERROR::: getMARKETs${err.message}`);
      throw err;
    }
  }

  async getChosenMarket(id: string) {
    try {
      const url = `/markets/${id}`
      const result = await axios.get(this.path + url, { withCredentials: true });
      assert.ok(result, Definer.general_err2);
      console.log("state:", result.data.data);
      const market: Market[] = result.data.data;;
      return market;
    } catch (err: any) {
      console.log(`ERROR:::getChosenMarket ${err.message}`);
      throw err
    }
  }
}

export default MarketApiService;
