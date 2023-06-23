import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { onMount } from 'solid-js';
import Api from './service';

interface TableauProps {
  games: {
    nom_editeur: string;
  }[];
  isLoading: boolean;
}


const Tableau: Component<TableauProps> = (props) => {
    
    const api = new Api()

    const [games, setgames] = createSignal(props.games || []);

    const [isLoading, setLoading] = createSignal(props.isLoading);

    onMount(async () => {
      try {
        // const api = new Api();
        const data = await api.get('EditeurViewset');
        setgames(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    });

    const Supp = (id : any) => {
      try {
        const api = new Api();
        api.delete('EditeurViewset',id)
        console.log('Editeur supp')
      } catch (error) {
        console.log(error)
      }
    
    }

    const Edit = async (id : any) => {
      try {
        // const api = new Api();
        const data = await api.getSingle('EditeurViewset', id);
        const nomEditeur = data.nom_editeur;
        const edit = document.getElementById('editeur')  as HTMLInputElement
        edit.value = nomEditeur
        edit.setAttribute('data-id',data.id_editeur)
        console.log(edit.value)
      } catch (error) {
        console.error(error);
      }
    
    }

    const handleEdit = async () => {
      try {
        // const api = new Api();
        const edit = document.getElementById('editeur') as HTMLInputElement;
        const id : any = edit.getAttribute('data-id');
        const data = {"nom_editeur": edit.value}
        await api.update('EditeurViewset', id, data )
      } catch (error) {
        console.log(error)
      }

    }

    return (
        <div>
      {isLoading() ? (
        <div>Chargement en cours...</div>
      ) : (
        <div class="overflow-x-auto w-full">
            <table class="table w-full">
                {/* <!-- head --> */}
                <thead>
                    <tr>
                        <th>Nom editeur</th>
                        {/* <th>Age min</th>
                        <th>Date de publication</th> */}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* <!-- row 1 --> */}
                    {games().map((game : any) => (
                     <tr>
                          <td>{ game.nom_editeur }</td>
                          {/* <td>{ game.age_min }</td>
                          <td>{ game.date_publication }</td> */}
                          <th>
                            <button onClick={() => Supp(game.id_editeur)} class="btn btn-ghost btn-xs">Supp</button>
                          </th>
                          <th>
                            <button onClick={() => Edit(game.id_editeur)} class="btn btn-ghost btn-xs">Edit</button>
                          </th>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
      )}
      <form onSubmit={handleEdit} class="form">

        <label class="label">
            <span class="label-text">Edit nom Editeur</span>
        </label>
        <label class="input-group">
            <input id='editeur' name="edit" type="text" placeholder="Treyarch" class="input input-bordered"/>
        </label>

        <button type="submit" class="btn btn-active btn-primary">
        Edit editeur
        </button>
      </form>
      </div>
    );

};

export default Tableau;