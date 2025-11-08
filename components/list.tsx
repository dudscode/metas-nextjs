'use client';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemHeader,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Goal } from "@/types/goals.interface";
import { Button } from "./ui/button";
import { BookmarkCheck } from "lucide-react";
import { Separator } from "./ui/separator";

export function List({ goalsFinished = [], goalsPending = [], onComplete }: { goalsFinished?: Goal[]; goalsPending?: Goal[]; onComplete?: (goal: Goal) => void }) {
    return (
        <Card className="flex flex-col  p-4 m-4 w-2/5">
            <section className="flex justify-center items-center">
                <h2 className="text-2xl mb-4">Suas metas</h2>
            </section>
            {!goalsFinished.length  && !goalsPending.length  ? (<p>Você não tem metas ainda.</p>) : (
                <section className="flex flex-row justify-around">
                    {
                        goalsPending.length ? (
                            <div>
                                {goalsPending.map((goal) => (
                                    <div key={goal.id}>
                                        <Item key={(goal as any).id ?? goal.name} className="mb-4">
                                            <ItemHeader>Pendentes</ItemHeader>
                                            <ItemContent>
                                                <ItemTitle>{goal.name}</ItemTitle>
                                                <ItemDescription>{goal.description}</ItemDescription>
                                            </ItemContent>
                                            <ItemContent>
                                                <Badge variant="default">{goal.status}</Badge>
                                            </ItemContent>
                                            <ItemActions>
                                                <Button variant="default" size="icon" aria-label="Submit" className="bg-teal-800" onClick={() => onComplete?.(goal)}>
                                                    <BookmarkCheck />
                                                </Button>
                                            </ItemActions>
                                        </Item>
                                    </div>
                                ))}
                            </div>

                        ) : null

                    }
                    {
                        goalsPending.length  ? (
                            <div className="mx-4">
                                <Separator orientation="vertical" />
                            </div>
                        ): null}


                    <div>
                        {goalsFinished.length  && goalsFinished.map((goal) => (

                            <div key={goal.id}>
                                <Item className="mb-4">
                                    <ItemHeader>Finalizadas</ItemHeader>
                                    <ItemContent>
                                        <ItemTitle>{goal.name}</ItemTitle>
                                        <ItemDescription>{goal.description}</ItemDescription>
                                    </ItemContent>
                                    <ItemContent>
                                        <Badge variant='secondary' className='bg-teal-800'>{goal.status}</Badge>
                                    </ItemContent>

                                </Item>
                            </div>
                        ))}
                    </div>





                </section>
            )}



        </Card>
    );
}