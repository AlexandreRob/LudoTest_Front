import { Component, createSignal, onMount } from 'solid-js';
import Api from './service';


interface Form {
    games: {
      nom_editeur: string;
    }[];
  }

const Formulaire: Component<Form> = () => {

    const [nomEditeur, setNomEditeur] = createSignal('');

    const handleSubmit = async (event: Event) => {

      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const newEmployee = {
        nom_editeur: formData.get('editeur') as string,
        };
        // console.log(newEmployee)
        const api = new Api();
        try {
            await api.post('EditeurViewset', newEmployee)
            const data = newEmployee.nom_editeur
            setNomEditeur(data)
        } catch (error){
            console.log("Erreur : ", error);
        }
    };
  
    return (
        <div>
        <form onSubmit={handleSubmit} class="form">

            <label class="label">
                <span class="label-text">Entrer nom Editeur</span>
            </label>
            <label class="input-group">
                <input name="editeur" type="text" placeholder="Treyarch" class="input input-bordered"/>
            </label>

            <button type="submit" class="btn btn-active btn-primary">
            Add editeur
            </button>
        </form>
        </div>
    );
  };
  
  export default Formulaire;