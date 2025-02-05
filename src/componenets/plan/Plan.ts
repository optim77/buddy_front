export default interface Plan {
    id: number;
    name: string;
    description: string;
    price: number;
    planOwnerId: number;
    planOwnerName: string;
    subscriptionsCount: number;
}