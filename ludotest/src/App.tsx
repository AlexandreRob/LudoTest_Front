import type { Component } from 'solid-js';

import Tableau from './tableau';
import Formulaire from './formulaire';

const App: Component = () => {
  const handleEdit = (id: any) => {
  };
  return (
    <>
    < Formulaire edit={handleEdit}></Formulaire>
    < Tableau></Tableau>
    </>

  );
};

export default App;
