import { render, screen } from "@solidjs/testing-library";
import Tableau from "./tableau";

describe("Test du tableau", () => {
    it('Test des données dans le tableau', async () => {
        const mockGames = [
          { nom_editeur: 'Editeur 1' },
          { nom_editeur: 'Editeur 2' },
        ];
        
        render(() => <Tableau games={mockGames} isLoading={false} />);

    // Vérifiez si les jeux sont correctement affichés dans le tableau
    const jeu1 = screen.getByText('Editeur 1');
    expect(jeu1).toBeInTheDocument();

    const jeu2 = screen.getByText('Editeur 2');
    expect(jeu2).toBeInTheDocument();

  });
})

