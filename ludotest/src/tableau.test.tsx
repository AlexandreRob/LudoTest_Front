import { render } from "@solidjs/testing-library";
import Tableau from "./table";
import { fetchData, postData, deleteData, fetchSingle, updateData } from './api';

describe("Test du tableau", () => {
    it('Test des données dans le tableau', async () => {
        const mockData = [
            {
            nom_jeu: 'Monopoly',
            date_publication: '1939-12-10',
            age_min: 8,
          },
          {
            nom_jeu: 'Scrabble',
            date_publication: '1948-12-01',
            age_min: 10,
          },
        ];

    const { getByText } = render(() => <Tableau games={mockData} isLoading={false} />);

    // Vérifie que les données de la table sont affichées correctement
    expect(getByText('Monopoly')).toBeInTheDocument();
    expect(getByText('Scrabble')).toBeInTheDocument();
    expect(getByText('8')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
    expect(getByText('1939-12-10')).toBeInTheDocument();
    expect(getByText('1948-12-01')).toBeInTheDocument();

  });

  it('affiche un message de chargement en cours', () => {
    const { getByText } = render(() => <Tableau games={[]} isLoading={false} />);

    // Vérifie que le message de chargement en cours est affiché
    expect(getByText('Chargement en cours...')).toBeInTheDocument();
  });
})