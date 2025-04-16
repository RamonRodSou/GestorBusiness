import { v4 as uuidv4 } from 'uuid';
import { EMPTY } from '@utils/string-utils';

export class ServiceOrder {
  public readonly id: string;
  public readonly orderNumber: string;

  constructor(
    public description: string = EMPTY,
    public createdAt: Date = new Date(),
    public status: 'pending' | 'in_progress' | 'completed' = 'pending'
  ) {
    this.id = uuidv4();
    this.orderNumber = this.generateOrderNumber();
  }

  private generateOrderNumber(): string {
    const timestamp = this.createdAt.getTime().toString().slice(-5); // e.g. last 5 digits of timestamp
    const prefix = 'SO'; // Service Order
    const uuidPart = this.id.split('-')[0].toUpperCase(); // partial UUID
    return `${prefix}-${timestamp}-${uuidPart}`;
  }

  updateStatus(newStatus: 'pending' | 'in_progress' | 'completed') {
    this.status = newStatus;
  }
}
