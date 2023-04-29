import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

class WiseyAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = "https://api.wisey.app/api/v1";
  }

  setToken(token: string): void {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  async getToken(): Promise<void> {
    try {
      const res: AxiosResponse<{ token: string }> = await axios.get(
        `${this.baseURL}/auth/anonymous?platform=subscriptions`
      );
      this.setToken(res.data.token);
    } catch (error) {
      toast.error("Something goes wrong.");
    }
  }

  async getCourses() {
    try {
      await this.getToken();
      const res = await axios.get(`${this.baseURL}/core/preview-courses`);
      return res.data;
    } catch (error) {
      toast.error("Something goes wrong.");
    }
  }

  async getCourseById(id: string) {
    try {
      await this.getToken();
      const res = await axios.get(`${this.baseURL}/core/preview-courses/${id}`);
      return res.data;
    } catch (error) {
      toast.error("Something goes wrong.");
    }
  }
}

const wiseyAPI = new WiseyAPI();
export default wiseyAPI;