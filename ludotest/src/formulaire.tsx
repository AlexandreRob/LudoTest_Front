import { Component, createSignal, onMount } from 'solid-js';
import Api from './api';

const Formulaire: Component = () => {

    const [editeurs, setediteurs] = createSignal<any[]>([]);

    const handleSubmit = (event: Event) => {
      event.preventDefault();

      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const newEmployee = {
        nom_editeur: formData.get('editeur') as string,
        };
    };
  
    return (
        <form onSubmit={handleSubmit} class="form">

            <label class="label">
                <span class="label-text">Entrer nom Editeur</span>
            </label>
            <label class="input-group">
                <input name="editeur" type="text" placeholder="Treyarch" class="input input-bordered"/>
            </label>

            <button type="submit" class="btn btn-active btn-primary">
            Add Employee
            </button>
        </form>
    );
  };
  
  export default Formulaire;