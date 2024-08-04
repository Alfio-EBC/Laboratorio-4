import React, { useEffect, useState } from 'react';

const Species = () => {
  const [characters, setCharacters] = useState([]);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response => response.json())
      .then(data => {
        setCharacters(data.results);
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });

    fetch('https://rickandmortyapi.com/api/episode')
      .then(response => response.json())
      .then(data => {
        setEpisodes(data.results);
      })
      .catch(error => {
        console.error('Error fetching episodes:', error);
      });
  }, []);

  const getEpisodesForCharacter = (episodeUrls) => {
    return episodeUrls.map(episodeUrl => {
      const episode = episodes.find(ep => ep.url === episodeUrl);
      return episode ? (
        <tr key={episode.id}>
          <td>{episode.episode}</td>
          <td>{episode.name}</td>
          <td>{episode.air_date}</td>
        </tr>
      ) : null;
    });
  };

  return (
    <div className="species-container">
      <h2 className="title">Personajes de Rick and Morty</h2>
      <table className="characters-table">
        <thead>
          <tr>
            <th>Character Name</th>
            <th>Status</th>
            <th>Species</th>
            <th>Gender</th>
            <th>Number of Episodes</th>
            <th>Episodes Details</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(character => (
            <React.Fragment key={character.id}>
              <tr>
                <td>{character.name}</td>
                <td>{character.status}</td>
                <td>{character.species}</td>
                <td>{character.gender}</td>
                <td>{character.episode.length}</td>
                <td>
                  <table className="episodes-table">
                    <thead>
                      <tr>
                        <th>Episode</th>
                        <th>Name</th>
                        <th>Air Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getEpisodesForCharacter(character.episode)}
                    </tbody>
                  </table>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Species;
