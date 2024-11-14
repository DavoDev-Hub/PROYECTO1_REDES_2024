import React, { useEffect, useState } from "react";
import "./App.css"; // Asegúrate de importar los estilos

function ProplayersList() {
  const [proplayers, setProplayers] = useState([]);
  const [editPlayer, setEditPlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    nombre: "",
    foto: "",
    earnings: "",
  });

  useEffect(() => {
    fetchProplayers();
  }, []);

  const fetchProplayers = () => {
    fetch("http://localhost:5000/api/proplayers")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProplayers(data);
        } else {
          console.error("Error: la respuesta no es un arreglo", data);
          setProplayers([]); // Establece un arreglo vacío si la respuesta no es un arreglo
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/proplayers/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchProplayers())
      .catch((error) => console.error("Error deleting proplayer:", error));
  };

  const handleEdit = (player) => {
    setEditPlayer(player);
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/api/proplayers/${editPlayer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editPlayer),
    })
      .then(() => {
        setEditPlayer(null);
        fetchProplayers();
      })
      .catch((error) => console.error("Error updating proplayer:", error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPlayer({ ...editPlayer, [name]: value });
  };

  const handleCreate = () => {
    fetch("http://localhost:5000/api/proplayers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    })
      .then(() => {
        setNewPlayer({ nombre: "", foto: "", earnings: "" });
        fetchProplayers();
      })
      .catch((error) => console.error("Error creating proplayer:", error));
  };

  const handleNewPlayerChange = (e) => {
    const { name, value } = e.target;
    setNewPlayer({ ...newPlayer, [name]: value });
  };

  return (
    <div className="ProplayersList-container">
      <h2>Lista de Proplayers</h2>

      {/* Formulario para crear un nuevo proplayer */}
      <div className="add-player-form">
        <h3>Agregar Nuevo Proplayer</h3>
        <input
          type="text"
          name="nombre"
          value={newPlayer.nombre}
          onChange={handleNewPlayerChange}
          placeholder="Nombre"
        />
        <input
          type="text"
          name="foto"
          value={newPlayer.foto}
          onChange={handleNewPlayerChange}
          placeholder="URL de la Foto"
        />
        <input
          type="number"
          name="earnings"
          value={newPlayer.earnings}
          onChange={handleNewPlayerChange}
          placeholder="Ganancias"
        />
        <button onClick={handleCreate}>Agregar Proplayer</button>
      </div>

      <div className="proplayer-cards">
        {(proplayers || []).map((player) => (
          <div className="proplayer-card" key={player.id}>
            <h3>{player.nombre}</h3>
            <img src={player.foto} alt={player.nombre} width="100" />
            <p>Ganancias: ${player.earnings}</p>
            <button onClick={() => handleEdit(player)}>Editar</button>
            <button onClick={() => handleDelete(player.id)}>Eliminar</button>
          </div>
        ))}
      </div>

      {editPlayer && (
        <div className="edit-player-form">
          <h3>Editar Proplayer</h3>
          <input
            type="text"
            name="nombre"
            value={editPlayer.nombre}
            onChange={handleChange}
            placeholder="Nombre"
          />
          <input
            type="text"
            name="foto"
            value={editPlayer.foto}
            onChange={handleChange}
            placeholder="URL de la Foto"
          />
          <input
            type="number"
            name="earnings"
            value={editPlayer.earnings}
            onChange={handleChange}
            placeholder="Ganancias"
          />
          <button onClick={handleUpdate}>Guardar cambios</button>
          <button className="cancel" onClick={() => setEditPlayer(null)}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

export default ProplayersList;
