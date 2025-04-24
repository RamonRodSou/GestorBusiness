import { Collaborator } from "@domain/user";
import { auth, db } from "./firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

export async function collaboratorAdd(collaborator: Collaborator) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuário não autenticado.");

        await addDoc(collection(db, 'collaborators'), {
            userId: user.uid,
            name: collaborator.name,
            email: collaborator.email,
            phone: collaborator.phone,
            createdAt: collaborator.createdAt,
        });
        alert('Colaborador adicionado com sucesso!');
    } catch (error) {
        alert('Erro ao adicionar colaborador: ' + error);
        throw error;
    }
}

export async function findAllCollaborators(): Promise<Collaborator[]> {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuário não autenticado.");

        const snapshot = await getDocs(collection(db, 'collaborators'));
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Collaborator));
    } catch (error) {
        alert('Erro ao listar colaboradores: ' + error);
        throw error;
    }
}
