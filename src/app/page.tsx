'use client';
import { useEffect, useState } from 'react';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad: number;
}

export default function Home() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');

  const API = 'http://localhost:3001/usuarios';

  const cargarUsuarios = () => {
    fetch(API)
      .then(res => res.json())
      .then(data => setUsuarios(data));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const crearUsuario = async () => {
    await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, edad: Number(edad) }),
    });
    setNombre('');
    setEmail('');
    setEdad('');
    cargarUsuarios();
  };

  const eliminarUsuario = async (id: number) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    cargarUsuarios();
  };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">👥 Gestión de Usuarios</h1>

      {/* Formulario */}
      <div className="border p-4 rounded-lg mb-6 flex flex-col gap-3">
        <h2 className="text-xl font-bold">➕ Nuevo Usuario</h2>
        <input className="border p-2 rounded text-black" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input className="border p-2 rounded text-black" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="border p-2 rounded text-black" placeholder="Edad" value={edad} onChange={e => setEdad(e.target.value)} />
        <button onClick={crearUsuario} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Crear Usuario
        </button>
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-4">
        {usuarios.map(usuario => (
          <div key={usuario.id} className="border p-4 rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{usuario.nombre}</h2>
              <p>📧 {usuario.email}</p>
              <p>🎂 {usuario.edad} años</p>
            </div>
            <button onClick={() => eliminarUsuario(usuario.id)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              🗑️ Eliminar
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}