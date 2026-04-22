export interface Plx {
    id: number;
    category: string;
    value: number;
    status: 'up' | 'down' | 'stable';
    lastUpdated: string;
}
