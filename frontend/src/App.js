import logo from './logo.svg';
import {colors} from './assets/styles/styleGuide';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/test")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <img src={require(`./assets/imgs/menu/burgers/${data.name}_${data.size}.png`)} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data.name}</p>
      </header>
    </div>
  );
}

export default App;
