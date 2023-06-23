import { render, fireEvent, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event"
import Formulaire from "./formulaire";
import Api from './service'

const api= new Api()

describe("Test du Formulaire", () => {
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: jest.fn().mockResolvedValue(
            {
                nom_editeur: "Treyarch",
            },
          ),
        });
      });

    it("Test rendu formulaire", async () => {

        // Rendu du formulaire
        render(() => <Formulaire games={[]}/>)

        // Verification de la présence des élement du form
        const label = screen.getByText('Entrer nom Editeur');
        const input = screen.getByPlaceholderText('Treyarch');
        const submitButton = screen.getByText('Add editeur');

        expect(label).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it("Test d'ajout de donnée", async () => {
        render(() => <Formulaire games={[]}/>);

        // Formulaire avec la valeur
        const input = screen.getByPlaceholderText("Treyarch");
        fireEvent.input(input, { target: { value: "Nouvel éditeur" } });
    
        // Click "Add editeur"
        const user = userEvent.setup();
        const addButton = screen.getByText("Add editeur");
        await user.click(addButton);
    
        // Vérification des données envoyées à l'API
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenLastCalledWith(
          "http://127.0.0.1:8000/api/EditeurViewset/",
          {
            method: "POST",
            body: JSON.stringify({ nom_editeur: "Nouvel éditeur" }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      });
    });
