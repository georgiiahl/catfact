import React, { useEffect, useState } from 'react';
import './App.css';

interface CatFact {
  fact: string;
  length: number;
}

const App: React.FC = () => {
  const [fact, setFact] = useState<CatFact | null>(null);
  const [facts, setFacts] = useState<CatFact[]>([]);
  const [count, setCount] = useState(1);

  const fetchFact = () => {
    fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(data => {
        setFact(data);
        setFacts(prevFacts => [data, ...prevFacts]);
      })
      .catch(error => console.error('Error fetching the cat fact:', error));
  };

  useEffect(() => {
    fetchFact();
  }, []);

  const handleFetchNewFacts = () => {
    setFacts([]);
    for (let i = 0; i < count; i++) {
      fetchFact();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Cat Fact</h1>
        {fact ? (
          <p>{fact.fact}</p>
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={fetchFact}>Load New Fact</button>
        <div>
          <label htmlFor="factCount">Number of Facts:</label>
          <input
            id="factCount"
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            min="1"
          />
          <button onClick={handleFetchNewFacts}>Load Multiple Facts</button>
        </div>
        <h2>Previous Facts</h2>
        <ul>
          {facts.map((fact, index) => (
            <li key={index}>{fact.fact}</li>
          ))}
        </ul>
      </header>
    </div>
  );
};

export default App;
