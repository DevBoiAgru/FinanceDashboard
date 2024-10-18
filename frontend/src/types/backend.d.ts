export interface Stat {
    balance: number;
    id: number;
    time: string;
    total_spent: number;
    total_collected: number;
}

export interface Transaction {
    id?: number;
    time?: string;
    denomination: number;
    num_notes: number;
    description: string;
    direction: number;
}

export interface Cash {
    five_hundred: number;
    two_hundred: number;
    hundred: number;
    fifty: number;
    twenty: number;
    ten: number;
    five: number;
    two: number;
    one: number;
}

export interface BackendData {
    error: string;
    message: string;
    data: any;
}
