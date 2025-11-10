"use client"
import { GoalPayload } from "@/types/goals.interface";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { useGoalsStore } from "@/lib/useGoalsStore";

export function Search() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const payload: GoalPayload = { name, description }
    const handleSubmit = async (e: React.FormEvent) => {
        const userID = await cookieStore.get("idGoalsUser").then(cookie => cookie?.value || "");
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8080/goal/create/" + userID, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const err = await res.text()
                console.error("Register failed:", err)
                return
            }
            if (res.ok) {
                name && setName("")
                description && setDescription("")
                console.log("Goal registered successfully")
                useGoalsStore.getState().triggerReload()
            }

        }
        catch (error) {
            console.error("An error occurred:", error)
        }
    }

    return (
        <Card className="flex items-center  justify-between  p-4 m-4 w-2/5">
            <div>Qual é a sua nova meta?</div>
            <Input type="text" placeholder="Add nova meta" value={name} onChange={(e) => setName(e.target.value)} />
            <Textarea placeholder="Add descrição" value={description} onChange={(e) => setDescription(e.target.value)} />

            <Button type="submit" variant="outline" disabled={!name} onClick={handleSubmit}>
                Adicionar
            </Button>
        </Card>
    );
}