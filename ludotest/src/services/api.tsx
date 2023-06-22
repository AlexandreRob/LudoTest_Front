class ApiService {
 baseUrl = "http://127.0.0.1:8000/api/"
  
  async fetchData(endpoint : string) {
    try {
      const url = this.baseUrl + endpoint;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erreur lors de la requête fetch');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async createResource(data: any): Promise<any> {
    try {
      const url = `${this.baseUrl}JeuViewset/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la requête fetch');
      }
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default ApiService;
