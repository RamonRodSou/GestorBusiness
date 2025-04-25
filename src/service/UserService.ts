import { Client } from "@domain/user/client/Client";
import firebase from "firebase/compat/app"
import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function clientAdd(client: Client) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuário não autenticado.");
        await addDoc(collection(db, 'clients'), {
            userId: user.uid,
            name: client.name,
            phone: client.phone,
            email: client.email,
            street: client.street,
            houserNumber: client.houserNumber,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode,
            country: client.country,
            createdAt: client.createdAt,
        });
    } catch (error) {
        alert('Erro ao registrar um novo cliente: ' + error);
        throw error;
    }
}

export async function findAllClients (): Promise<Client[]> {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuário não autenticado.");
    
        const snapshot = await getDocs(collection(db, 'clients'));
        return snapshot.docs.map((it) => ({ id: it.id, ...it.data() } as Client))
    } catch (error) {
        alert('Erro ao listar cliente: ' + error);
        throw error;
    }
}

export async function findByClientId(id: string): Promise<Client | null> {
    try {
        const ref = doc(db, 'clients', id);
        const snapshot = await getDoc(ref);

        if (!snapshot.exists()) return null;

        return { id: snapshot.id, ...snapshot.data() } as Client;
    } catch (error) {
        alert('Erro ao buscar cliente: ' + error);
        throw error;
    }
}

export async function updateClient(id: string, data: Partial<Client>): Promise<void> {
    try {
        const ref = doc(db, 'clients', id);
        await updateDoc(ref, data);
    } catch (error) {
        alert('Erro ao atualizar ordem de serviço: ' + error);
        throw error;
    }
}


export async function clientDelete(id: string) {
    try {
        await firebase.firestore().collection('clients').doc(id).delete()
    } catch (error) {
        alert('Erro ao deletar a cliente: ' + error)
    }
}