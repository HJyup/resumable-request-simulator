import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Props {
  progress: number;
  remaining: number;
}

const ProgressCard = ({ progress, remaining }: Props) => (
  <Card>
    <CardHeader>
      <CardTitle>Progress</CardTitle>
      <CardDescription>
        {remaining > 0
          ? `${remaining} request${remaining === 1 ? "" : "s"} left to process`
          : "No pending requests"}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Progress value={progress} className="h-4" />
    </CardContent>
  </Card>
);

export default ProgressCard;
