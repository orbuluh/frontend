import React from 'react';

import Table from './table.tsx'
import './App.css'
import data from './data.csv';

const App = () => {
  console.log(data)
  return (
    <div>
      <h1>CSV Table</h1>
      <Table data={data} />
    </div>
  );
};

export default App;