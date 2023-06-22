import ApiService from './services/api';

describe('ApiService', () => {
  it('effectue une requête fetch avec l\'URL complète', async () => {
    const mockData = {
      "id_jeu": 1,
      "nom_jeu": "Monopoly",
      "date_publication": "1939-12-10",
      "age_min": 8,
      "joueurs_min": 2,
      "joueurs_max": 10,
      "id_editeur": 1
  };
    const mockResponse = { ok: true, json: jest.fn().mockResolvedValue(mockData) };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const apiService = new ApiService();
    const result = await apiService.fetchData('JeuViewset/');

    expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/JeuViewset/');
    expect(result).toEqual(mockData);
  });

  // it('lance une erreur en cas d\'erreur dans la réponse JSON', async () => {
  //   const mockResponse = { ok: true, json: jest.fn().mockRejectedValue(new Error('Erreur JSON')) };

  //   global.fetch = jest.fn().mockResolvedValue(mockResponse);

  //   const apiService = new ApiService();

  //   expect(apiService.fetchData('JeuViewset/')).rejects.toThrow('Erreur JSON');
  // });

  it('crée une nouvelle ressource avec succès', async () => {
    const mockData = {
      id_jeu: 1,
      nom_jeu: 'Monopoly',
      date_publication: '1939-12-10',
      age_min: 8,
      joueurs_min: 2,
      joueurs_max: 10,
      id_editeur: 1,
    };
    const mockResponse = { ok: true, json: jest.fn().mockResolvedValue(mockData) };

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    const apiService = new ApiService();
    const newData = {
      nom_jeu: 'Monopoly',
      date_publication: '1939-12-10',
      age_min: 8,
      joueurs_min: 2,
      joueurs_max: 10,
      id_editeur: 1,
    };
    const createdData = await apiService.createResource(newData);
    
    expect(global.fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/JeuViewset/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });
    expect(createdData).toEqual(mockData);
  });
});
