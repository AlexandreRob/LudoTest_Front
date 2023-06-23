import Api from "./service"

const api = new Api()
const mockData = {
  id_jeu: 2,
  nom_jeu: "It's a wonderful world",
  date_publication: "2015-04-05",
  age_min: 3,
  joueurs_min: 4,
  joueurs_max: 6,
  id_editeur: 1,
};
const id = "1"
const baseUrl = 'http://127.0.0.1:8000/api/';
const endpoint = 'JeuViewset';

describe('test api', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  it('test get', async () => {
    const data = await api.get(endpoint);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}/`, {
      method: 'GET',
      headers: {},
    });
    expect(data).toEqual(mockData);
  });

  it('test getSingle', async () => {
    const data = await api.getSingle(endpoint, id);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}/${id}/`, {
      method: 'GET',
      headers: {},
    });
    expect(data).toEqual(mockData);
  });

  it('test postData', async () => {
    const responseData = await api.post(endpoint, mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockData),
    });
    expect(responseData).toEqual(mockData);
  });

  it('test deleteData', async () => {
    await api.delete(endpoint, id);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}/${id}/`, {
      method: 'DELETE',
    });
  });

  it('test updateData', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockData),
    });

    const data = await api.update(endpoint, id, mockData);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}${endpoint}/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    expect(data).toEqual(mockData);
  });

});
