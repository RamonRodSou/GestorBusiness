import { Client } from "@domain/user/client/Client";
import firebase from "firebase/compat/app"
import { addDoc, collection, getDocs } from "firebase/firestore";
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
        alert('Cliente registrado com sucesso!');
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

export const findbyclientId = async (id: string, setData: any) => {
    try {
        const docRef = await firebase.firestore().collection('clients').doc(id).get()
        if (docRef.exists) {
            const clientData = { id: docRef.id, ...docRef.data() } as Client
            setData(clientData)
        } else {
            console.error('Documento não encontrado.')
            setData(null)
        }
    } catch (error) {
        console.error('Erro ao mostrar o cliente:', error)
        alert('Erro ao obter a client. Verifique o console para mais detalhes.')
    }
}

export async function clientUpdate(id: string, client: Client) {
  try {
    await firebase.firestore().collection('clients').doc(id).update({
        name: client.name,
        phone: client.phone,
        email: client.email,
    })
  } catch (error) {
        alert('Erro ao atualizar o cliente: ' + error)
  }
}

export async function clientDelete(id: string) {
    try {
        await firebase.firestore().collection('clients').doc(id).delete()
    } catch (error) {
        alert('Erro ao deletar a cliente: ' + error)
    }
}