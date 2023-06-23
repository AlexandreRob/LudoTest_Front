import { Component, createSignal, onMount } from 'solid-js';
import Api from './api';

const Formulaire: Component<{ edit: (id: any) => Promise<void> }> = (props) => {

    const [nomEditeur, setNomEditeur] = createSignal('');

    const handleSubmit = (event: Event) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const newEmployee = {
        nom_editeur: formData.get('editeur') as string,
        };
        const api = new Api();
        try {
            api.post('EditeurViewset/', newEmployee)
            console.log('editeur crée : ', newEmployee)
        } catch (error){
            console.log("Erreur : ", error);
        }
        
    };

    const handleEdit = (event: Event) => {
        event.preventDefault();
        const api = new Api();
        // Effectuez l'action souhaitée avec les données du formulaire
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