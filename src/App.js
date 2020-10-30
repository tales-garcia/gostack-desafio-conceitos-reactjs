import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);


  useEffect(() => {
    api.get('repositories').then(res => setRepositories(res.data));
  }, [])

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: `Novo repositorio ${Date.now()}`,
      url: 'http://teste',
      techs: ['React', 'Js']
    })

    setRepositories([...repositories, res.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id));
  }


  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (
            <li key={repo.id}>
              {repo.title}

              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
