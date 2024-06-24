import React, { useEffect, useState } from 'react';
import './App.css';

interface CatFact {
  fact: string;
  length: number;
}

const App: React.FC = () => {
  const [fact, setFact] = useState<CatFact | null>(null);

  useEffect(() => {
    fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(data => setFact(data))
      .catch(error => console.error('Error fetching the cat fact:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Cat Fact</h1>
        {fact ? (
          <p>{fact.fact}</p>
        ) : (
          <p>Loading...</p>
        )}
      </header>
    </div>
  );
};

export default App;
