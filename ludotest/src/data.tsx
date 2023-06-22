import ApiService from './services/api';
import { Component, createSignal, onCleanup, onMount } from 'solid-js';

const apiService = new ApiService();

const MyComponent : Component = () => {
    const [data, setData] = createSignal(null);
    const [error, setError] = createSignal(null);
  
    onCleanup(() => {
      // Nettoyage des signaux lors de la destruction du composant
      setData(null);
      setError(null);
    });
  
    // Effectue la requête fetch lors du montage du composant
    onMount(async () => {
      try {
        const result = await apiService.fetchData('JeuViewset/');
        setData(result);
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    });

    return (
      <div>
      </div>
    );
  }
  export default MyComponent;