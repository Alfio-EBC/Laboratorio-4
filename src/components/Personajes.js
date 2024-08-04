import React, { useEffect, useState } from "react";

const Character = () => {
    const [characters, setCharacters] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [expandedCharacter, setExpandedCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character")
            .then(response => response.json())
            .then(data => {
                setCharacters(data.results);
                setLoading(false);
            })
            .catch(error => {
                console.error("Se produjo un error al obtener los datos del personaje!", error);
                setLoading(false);
            });

        fetch("https://rickandmortyapi.com/api/episode")
            .then(response => response.json())
            .then(data => {
                setEpisodes(data.results);
            })
            .catch(error => {
                console.error("Se produjo un error al obtener los datos del episodio", error);
            });
    }, []);

    const handleShowEpisodes = (characterId) => {
        if (expandedCharacter === characterId) {
            setExpandedCharacter(null);
        } else {
            setExpandedCharacter(characterId);
        }
    };

    if (loading) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="character-container">
            <h2 className="text-center text-light py-4">Personajes de Rick and Morty</h2>

            <div className="grid-container">
                {characters.map((character) => (
                    <div key={character.id} className="card">
                        <div className="card-body">
                            <h3 className="card-title">{character.name}</h3>
                            <hr />
                            <img src={character.image} alt={character.name} className="card-img-top" />
                            <p><strong>Estado:</strong> {character.status}</p>
                            <p><strong>Especie:</strong> {character.species}</p>
                            <p><strong>Género:</strong> {character.gender}</p>
                            <p><strong>Episodios:</strong> {character.episode.length}</p>

                            <button
                                onClick={() => handleShowEpisodes(character.id)}
                                className="btn btn-danger"
                            >
                                {expandedCharacter === character.id ? "Ocultar Episodios" : "Mostrar Episodios"}
                            </button>

                            {expandedCharacter === character.id && (
                                <table className="episode-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre del Episodio</th>
                                            <th>Fecha de Emisión</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {character.episode.map((episodeUrl) => {
                                            const episode = episodes.find(ep => ep.url === episodeUrl);
                                            if (episode) {
                                                return (
                                                    <tr key={episode.id}>
                                                        <td>{episode.id}</td>
                                                        <td>{episode.name}</td>
                                                        <td>{episode.air_date}</td>
                                                    </tr>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Character;
