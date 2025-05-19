import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import Request from "@/types/request";

const RequestCardForm = ({
  onSubmit,
  disabled = false,
}: {
  onSubmit: (requests: Request[]) => void;
  disabled?: boolean;
}) => {
  const [numRequests, setNumRequests] = useState<number>(10);
  const [timeoutDuration, setTimeoutDuration] = useState<number>(3);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requests: Request[] = [];

    for (let i = 0; i < numRequests; i++) {
      const randomString = Math.random().toString(36).substring(2, 7);

      requests.push({
        body: randomString,
        timeout: timeoutDuration,
        date: new Date().toISOString(),
      });
    }

    onSubmit(requests);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Configure Simulation</CardTitle>
          <CardDescription>
            Specify how many pseudo-requests will be added to IndexedDB
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6 md:grid-cols-3 my-8">
          <div className="space-y-2 col-span-2">
            <Label htmlFor="numRequests">Number of requests</Label>
            <Input
              id="numRequests"
              type="number"
              min={1}
              value={numRequests}
              onChange={(e) =>
                setNumRequests(
                  e.target.value === ""
                    ? 0
                    : Number.parseInt(e.target.value) || 0,
                )
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timeout">Timeout (s)</Label>
            <Input
              id="timeout"
              type="number"
              min={0.1}
              step={0.1}
              value={timeoutDuration}
              onChange={(e) =>
                setTimeoutDuration(
                  e.target.value === ""
                    ? 0
                    : Number.parseFloat(e.target.value) || 0,
                )
              }
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button type="submit" className="w-full" disabled={disabled}>
            Process requests
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RequestCardForm;
