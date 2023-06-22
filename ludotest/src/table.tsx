import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { onMount } from 'solid-js';
import ApiService from './services/api';

interface TableauProps {
  games: {
    nom_jeu: string;
    date_publication: string;
    age_min: number;
  }[];
  isLoading: boolean;
}


const Tableau: Component<TableauProps> = (props) => {

    const apiService = new ApiService();

    const [games, setgames] = createSignal([]);

    const [isLoading, setLoading] = createSignal(true);

    onMount(async () => {
      try {
        const data = await apiService.fetchData('JeuViewset/');
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
                    {props.games.map((game) => (
                     <tr>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="font-bold">{ game.nom_jeu }</div>
                              <div class="text-sm opacity-50">{ game.age_min }</div>
                            </div>
                          </div>
                        </td>
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