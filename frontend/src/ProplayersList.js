import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [players, setPlayers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    nombre: "",
    foto: "",
    earnings: "",
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/proplayers");
      const data = await response.json();
      if (Array.isArray(data)) {
        setPlayers(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await fetch(`http://localhost:5000/api/proplayers/${editingPlayer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingPlayer),
      });
      setShowEditModal(false);
      fetchPlayers();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAdd = async () => {
    try {
      await fetch("http://localhost:5000/api/proplayers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlayer),
      });
      setShowAddModal(false);
      setNewPlayer({ nombre: "", foto: "", earnings: "" });
      fetchPlayers();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/proplayers/${id}`, {
        method: "DELETE",
      });
      fetchPlayers();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <div className="header-content">
          <div className="center-section">
            <img src="/mexicanlogo.jpg" alt="Logo" className="logo" />
            <div className="title-button-container">
              <h1>MEXICAN MONKEYS</h1>
              <button
                className="add-button"
                onClick={() => setShowAddModal(true)}
              >
                Agregar Proplayer
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="players-grid">
        {players.map((player) => (
          <div key={player.id} className="player-card">
            <img
              src={player.foto}
              alt={player.nombre}
              className="player-image"
            />
            <h3>{player.nombre}</h3>
            <p>Ganancias: ${Number(player.earnings).toLocaleString()}</p>
            <div className="card-buttons">
              <button onClick={() => handleEdit(player)}>Editar</button>
              <button onClick={() => handleDelete(player.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Editar Proplayer</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={editingPlayer.nombre}
              onChange={(e) =>
                setEditingPlayer({ ...editingPlayer, nombre: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="URL de la foto"
              value={editingPlayer.foto}
              onChange={(e) =>
                setEditingPlayer({ ...editingPlayer, foto: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Ganancias"
              value={editingPlayer.earnings}
              onChange={(e) =>
                setEditingPlayer({ ...editingPlayer, earnings: e.target.value })
              }
            />
            <div className="modal-buttons">
              <button className="save-button" onClick={handleUpdate}>
                Guardar cambios
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowEditModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Agregar Proplayer</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={newPlayer.nombre}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, nombre: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="URL de la foto"
              value={newPlayer.foto}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, foto: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Ganancias"
              value={newPlayer.earnings}
              onChange={(e) =>
                setNewPlayer({ ...newPlayer, earnings: e.target.value })
              }
            />
            <div className="modal-buttons">
              <button className="save-button" onClick={handleAdd}>
                Agregar
              </button>
              <button
                className="cancel-button"
                onClick={() => setShowAddModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
