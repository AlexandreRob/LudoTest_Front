import { render, fireEvent, screen } from "@solidjs/testing-library";
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

    it("Test d'ajout de donnée", async () => {
        const data = await api.get('EditeurViewset/')
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:8000/api/EditeurViewset/');
        expect(data).toEqual({
            nom_editeur: "Treyarch"
        })
  });

  it("Test rendu formulaire", async () => {
    // Rendu du formulaire
    render(<Formulaire edit={}/>)

    // Verification de la présence des élement du form
    const label = screen.getByLabelText('Entrer nom Editeur');
    const input = screen.getByPlaceholderText('Treyarch');
    const submitButton = screen.getByText('Add editeur');

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    });
})
