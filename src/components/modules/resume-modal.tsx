import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ResumeModalProps {
  showModal: boolean;
  pendingCount: number;
  clearQueue: () => Promise<void>;
  processQueue: () => Promise<void>;
}

const ResumeModal = ({
  showModal,

  pendingCount,
  clearQueue,
  processQueue,
}: ResumeModalProps) => (
  <Dialog open={showModal}>
    <DialogContent className="[&>button]:hidden">
      <DialogHeader>
        <DialogTitle>Resume unfinished queue?</DialogTitle>
        <DialogDescription>
          {pendingCount} request{pendingCount === 1 ? "" : "s"} were saved from
          your last session. You can continue processing them or discard the
          queue.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="gap-2">
        <Button variant="secondary" onClick={clearQueue}>
          Discard
        </Button>
        <Button onClick={processQueue}>Continue</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default ResumeModal;
