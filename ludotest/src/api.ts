class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl = 'http://127.0.0.1:8000/api/'; 
  }

  public async get(endpoint: string): Promise<any> {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      return data;
  }

  public async getSingle(endpoint: string, id: string): Promise<any> {
      const response = await fetch(`${this.baseUrl}${endpoint}/${id}`);
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      return data;
  }

  public async post(endpoint: string, data: any): Promise<any> {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const responseData = await response.json();
      return responseData;
  }

  public async delete(endpoint: string, id: string): Promise<void> {
      const response = await fetch(`${this.baseUrl}${endpoint}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
  }

  public async update(endpoint: string, id: string, data: any): Promise<any> {
      const response = await fetch(`${this.baseUrl}${endpoint}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const responseData = await response.json();
      return responseData;
  }
}

export default Api