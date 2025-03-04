export default interface Plan {
    id: number;
    name: string;
    description: string;
    price: number;
    planOwnerId: string;
    planOwnerName: string;
    subscriptionsCount: number;
}
