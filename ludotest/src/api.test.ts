import Api from "./api"

const api= new Api()

describe('test api', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(
        {
          id_jeu: 2,
          nom_jeu: "It's a wonderful world",
          date_publication: "2015-04-05",
          age_min: 3,
          joueurs_min: 4,
          joueurs_max: 6,
          id_editeur: 1,
        },
      ),
    });
  });

  it('test get', async () => {
    const data = await api.get('JeuViewset');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/JeuViewset');
    expect(data).toEqual(
      {
        id_jeu: 2,
        nom_jeu: "It's a wonderful world",
        date_publication: "2015-04-05",
        age_min: 3,
        joueurs_min: 4,
        joueurs_max: 6,
        id_editeur: 1,
      },
    );
  });

  it('test requete echoue', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    await expect(api.get('JeuViewset')).rejects.toThrow('Request failed');
  });

  it('test postData', async () => {
    const data = {
      id_jeu: 2,
      nom_jeu: "It's a wonderful world",
      date_publication: "2015-04-05",
      age_min: 3,
      joueurs_min: 4,
      joueurs_max: 6,
      id_editeur: 1,
    };

    const responseData = await api.post('JeuViewset', data);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/JeuViewset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    expect(responseData).toEqual(data);
  });

  it('test deleteData', async () => {
    const id = '1';

    await api.delete('JeuViewset', id);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/JeuViewset/1', {
      method: 'DELETE',
    });
  });

  it('test updateData', async () => {
    const updatedData = {
      id_jeu: 2,
      nom_jeu: "It's a wonderful sky",
      date_publication: "2021-06-21",
      age_min: 5,
      joueurs_min: 2,
      joueurs_max: 4,
      id_editeur: 1,
    };

    const updatedResponse = {
      id_jeu: 2,
      nom_jeu: "It's a wonderful sky",
      date_publication: "2021-06-21",
      age_min: 5,
      joueurs_min: 2,
      joueurs_max: 4,
      id_editeur: 1,
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(updatedResponse),
    });

    const data = await api.update('JeuViewset', '2', updatedData);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/JeuViewset/2', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    expect(data).toEqual(updatedResponse);
  });

});

