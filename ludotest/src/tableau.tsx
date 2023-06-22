import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { onMount } from 'solid-js';
import Api from './api';

interface TableauProps {
  games: {
    nom_jeu: string;
    date_publication: string;
    age_min: number;
  }[];
  isLoading: boolean;
}


const Tableau: Component = () => {

    // const apiService = new ApiService();
    const api = new Api()

    const [games, setgames] = createSignal([]);

    const [isLoading, setLoading] = createSignal(true);

    onMount(async () => {
      try {
        const data = await api.get('JeuViewset/');
        setgames(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    });

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
                        <th>Nom</th>
                        <th>Age min</th>
                        <th>Date de publication</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* <!-- row 1 --> */}
                    {games().map((game : any) => (
                     <tr>
                          <td>{ game.nom_jeu }</td>
                          <td>{ game.age_min }</td>
                          <td>{ game.date_publication }</td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
      )}
      </div>
    );

};





export default Tableau;