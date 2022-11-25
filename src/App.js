import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import './App.scss'



function App() {
  const [data, setData] = useState({});
  return (
    <div className="app">
      <header className="app__header">
      <Header setData={setData} />
      </header>

      <main className="app__main">
      <Main data={data} />
      </main>

    </div>
  );
}


export default App;
