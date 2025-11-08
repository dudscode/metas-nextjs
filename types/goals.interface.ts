export interface Goal {
    id: string;
    name: string;
    description?: string;
    status: 'pendente' | 'Finalizado'; 
    linkUpdate?: string;
}