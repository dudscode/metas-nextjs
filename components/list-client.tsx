'use client'
import { useState } from 'react';
import { List } from './list'
import { Goal } from '@/types/goals.interface'

const mock: Goal[] = [
    {
        id: '1',
        name: 'Meta 1',
        description: 'Descrição da Meta 1',
        status: 'pendente',
        linkUpdate: 'https://example.com/update/1',
    },
    {
        id: '2',
        name: 'Meta 2',
        description: 'Descrição da Meta 2',
        status: 'Finalizado',
        linkUpdate: 'https://example.com/update/2',
    },
    {
        id: '3',
        name: 'Meta 3',
        description: 'Descrição da Meta 3',
        status: 'pendente',
        linkUpdate: 'https://example.com/update/3',
    },
]


export default function ListClient() {
    const initialFinished =  mock.filter(g => g.status === 'Finalizado')
    const initialPending = mock.filter(g => g.status === 'pendente')

    const [finished, setFinished] = useState<Goal[]>(initialFinished)
    const [pending, setPending] = useState<Goal[]>(initialPending)

    function handleComplete(goal: Goal) {
        const updated = { ...goal, status: 'Finalizado' } as Goal
        setPending((prev: Goal[]) => prev.filter((g: Goal) => g.id !== goal.id))
        setFinished((prev: Goal[]) => {
            if (prev.find((g: Goal) => g.id === goal.id)) return prev
            return [...prev, updated]
        })
        console.log('Meta marcada como completa (client wrapper):', updated)
    }

    return (
        <List goalsFinished={finished} goalsPending={pending} onComplete={handleComplete} />
    )
}
