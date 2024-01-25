import { useState } from 'react';

import Header from './Header/Header';
import Table from './Table/Table';


import './App.css';


const defaultState = {
  countryName: '',
  population: ''
}

function App() {
const [state, setState] = useState(defaultState);

  return (
    <div className="App">
      <Header setState={setState}/>
      <Table state={state}/>
    </div>
  );
}

export default App;
