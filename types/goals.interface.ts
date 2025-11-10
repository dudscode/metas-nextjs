export interface Goal {
    id: string;
    name: string;
    description?: string;
    status: 'Pendente' | 'Finalizada'; 
    _links: GoalLink;
}

export interface GoalPayload {
    name: string;
    description?: string;
}

export interface GoalLink {
    update: {
        href: string;
    }
}