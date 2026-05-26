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

  useEffect(() => {
    fetch('http://localhost:3001/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data));
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">👥 Lista de Usuarios</h1>
      <div className="grid gap-4">
        {usuarios.map(usuario => (
          <div key={usuario.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-bold">{usuario.nombre}</h2>
            <p>📧 {usuario.email}</p>
            <p>🎂 {usuario.edad} años</p>
          </div>
        ))}
      </div>
    </main>
  );
}