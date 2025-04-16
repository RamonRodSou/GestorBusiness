import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@service/firebase";
import { EMPTY } from "@utils/string-utils";

export default function Client() {
  const [nome, setNome] = useState(EMPTY);
  const [telefone, setTelefone] = useState(EMPTY);
  const [email, setEmail] = useState(EMPTY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "clientes"), {
        nome,
        telefone,
        email,
        dataCadastro: new Date(),
      });

      setNome(EMPTY);
      setTelefone(EMPTY);
      setEmail(EMPTY);
      alert("Cliente cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar cliente: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cadastrar Cliente</h2>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="tel"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        placeholder="Telefone"
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Salvar Cliente
      </button>
    </form>
  );
}
