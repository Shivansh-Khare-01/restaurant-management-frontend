import { toast } from "react-toastify";

export class AnalyticsService {
  static async getCategoriesAndSubCategories(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMsg = await response.json();
        toast(errorMsg?.message ? errorMsg?.message : "Some error occured");
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("GET Error:", error);
      throw error;
    }
  }

  /**
   * POST: Send analytics data
   * @param data Payload to send
   */
  static async postAnalyticsData(url: any, data: any): Promise<any> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMsg = await response.json();
        toast(errorMsg?.message ? errorMsg?.message : "Some error occured");
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("POST Error:", error);
      throw error;
    }
  }
  static async updateItem(url: string, data: any): Promise<any> {
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMsg = await response.json();
        toast(errorMsg?.message ? errorMsg?.message : "Some error occured");
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("PATCH Error:", error);
      throw error;
    }
  }

  static async deleteItem(url: string): Promise<any> {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMsg = await response.json();
        toast(errorMsg?.message ? errorMsg?.message : "Some error occured");
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("DELETE Error:", error);
      throw error;
    }
  }
}
