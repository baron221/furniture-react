import axios from "axios";
import assert from "assert";
import { serviceApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Market } from "../../types/user";

class MarketApiService {
    private readonly path:string;
  constructor() {
    this.path = serviceApi
  }

  async getPeakMarkets() {
    try {
        const url = '/markets?order=top&page=1&limit=4';
        const result  = await axios.get(this.path+url , {withCredentials:true});
        assert.ok(result ,Definer.general_err2);
        console.log('state::', result.data.state);
        const peak_markets:Market[] = result.data.data;
        return peak_markets;
    } catch (err: any) {
      console.log(`ERROR::: getPeakMARKET ${err.message}`);
      throw err;
    }
  }
}

export default MarketApiService;
