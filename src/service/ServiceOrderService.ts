import { ServiceOrder } from "@domain/service-order";
import { auth, db } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";

export async function serviceOrderAdd(order: ServiceOrder) {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuário não autenticado.");
        await addDoc(collection(db, 'serviceOrders'), {
            userId: user.uid,
            client: order.client,
            collaborator: order.collaborator,
            description: order.description,
            orderNumber: order.orderNumber,
            createdAt: order.createdAt,
            serviceValue: order.serviceValue,
            status: order.status
        });
    } catch (error) {
        alert('Erro ao registrar ordem de serviço: ' + error);
        throw error;
    }
}

export async function findAllServiceOrders(): Promise<ServiceOrder[]> {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("Usuário não autenticado.");

        const snapshot = await getDocs(collection(db, 'serviceOrders'));
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ServiceOrder));
    } catch (error) {
        alert('Erro ao listar ordens de serviço: ' + error);
        throw error;
    }
}

export async function findServiceOrderById(id: string): Promise<ServiceOrder | null> {
    try {
        const ref = doc(db, 'serviceOrders', id);
        const snapshot = await getDoc(ref);

        if (!snapshot.exists()) return null;

        return { id: snapshot.id, ...snapshot.data() } as ServiceOrder;
    } catch (error) {
        alert('Erro ao buscar ordem de serviço: ' + error);
        throw error;
    }
}

export async function updateServiceOrder(id: string, data: Partial<ServiceOrder>): Promise<void> {
    try {
        const ref = doc(db, 'serviceOrders', id);
        await updateDoc(ref, data);
    } catch (error) {
        alert('Erro ao atualizar ordem de serviço: ' + error);
        throw error;
    }
}

export async function deleteServiceOrder(id: string): Promise<void> {
    try {
        const ref = doc(db, 'serviceOrders', id);
        await deleteDoc(ref);
    } catch (error) {
        alert('Erro ao excluir ordem de serviço: ' + error);
        throw error;
    }
}