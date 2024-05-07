import { serviceApi } from "../../lib/config";
import axios from "axios";
import assert from "assert";
import { Definer } from "../../lib/Definer";
import { Community, SearchArticlesObj } from "../../types/Communtiy";

class CommunityApiService {
  private readonly path: string;
  constructor() {
    this.path = serviceApi;
  }

  public async getTargetArticles(data: SearchArticlesObj) {
    try{
        let url = `/community/target?bo_id=${data.bo_id}&page=${data.page}&limit=${data.limit}`;
        if (data.order) url += `&order=${data.order}`;
        const result = await axios.get(this.path + url, { withCredentials: true });
        assert.ok(result, Definer.general_err2);
        assert.ok(result?.data?.state != "fail", result?.data?.message);
        console.log("state:", result.data.state);
    
        const articles:Community[] = result.data.data;
        return articles
    
    }catch(err:any){
        console.log(`ERROR ::: getTargetArticles ${err.message}`);
        throw err
    }




  }
}

export default CommunityApiService;
