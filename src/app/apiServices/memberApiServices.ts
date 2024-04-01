import axios from "axios";
import assert from "assert";
import { serviceApi } from "../../lib/config";
import { Definer } from "../../lib/Definer";
import { Member } from "../../types/user";

class MemberApiService {
  private readonly path: string;
  constructor() {
    this.path = serviceApi;
  }
  public async loginRequest(login_data: any) {
    try {
      const result = axios.post(this.path + "/login", login_data, {
        withCredentials: true,
      });
      console.log("state:", (await result).data.state);
      assert.ok((await result)?.data, Definer.general_err2);
      assert.ok((await result)?.data?.state != "fail", (await result)?.data?.message);

      const member: Member = (await result).data.data;
      localStorage.setItem("member_data",JSON.stringify(member));
      return member;
    } catch (err: any) {
      console.log(`ERROR:::loginRequest${err.message}`);
      throw err;
    }
  }
}

export default MemberApiService;
