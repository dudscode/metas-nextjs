"use client"
import { useState } from 'react';
import { List } from './list'
import { Goal } from '@/types/goals.interface'
import React from 'react';
import useGoalsStore, { GoalsState } from '@/lib/useGoalsStore'




export default function ListClient() {

    const [finished, setFinished] = useState<Goal[]>([])
    const [pending, setPending] = useState<Goal[]>([])

    const handleLoadGoals = async () => {
        const userID = await cookieStore.get("idGoalsUser").then(cookie => cookie?.value || "");
        try {
            const res = await fetch("http://localhost:8080/goal/" + userID, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })

            if (!res.ok) {
                const err = await res.text()
                console.error("Load goals failed:", err)
                return
            }
            if (res.ok) {
                const data = await res.json()
                console.log("Goals loaded:", data)
                setFinished(data._embedded.goalList.filter((g: Goal) => g.status === 'Finalizada'))
                setPending(data._embedded.goalList.filter((g: Goal) => g.status === 'Pendente'))
            }

        }
        catch (error) {
            console.error("An error occurred:", error)
        }
    }

    React.useEffect(() => {
        handleLoadGoals();
    }, []);

    const reloadSignal = useGoalsStore((state: GoalsState) => state.reloadSignal)
    React.useEffect(() => {
        if (reloadSignal > 0) {
            handleLoadGoals()
        }
    }, [reloadSignal])

    const handleComplete = async (goal: Goal) => {
        const userID = await cookieStore.get("idGoalsUser").then(cookie => cookie?.value || "");
        try {
            const res = await fetch(goal._links.update.href, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: 'Finalizada' })

            })

            if (!res.ok) {
                const err = await res.text()
                console.error("Patch failed:", err)
                return
            }
            if (res.ok) {
                handleLoadGoals();
            }

        }
        catch (error) {
            console.error("An error occurred:", error)
        }

    }

    return (
        <List goalsFinished={finished} goalsPending={pending} onComplete={handleComplete} />
    )
}
