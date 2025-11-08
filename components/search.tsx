import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function Search() {
    return (
        <Card className="flex items-center  justify-between  p-4 m-4 w-2/5">
            <div>Qual é a sua nova meta?</div>
            <Input type="text" placeholder="Add nova meta" />
            <Textarea placeholder="Add descrição" />

            <Button type="submit" variant="outline">
                Adicionar
            </Button>
        </Card>
    );
}