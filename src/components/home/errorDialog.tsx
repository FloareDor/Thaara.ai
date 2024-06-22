// ErrorDialog.tsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface ErrorDialogProps {
  error: string | null;
  onClose: () => void;
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({ error, onClose }) => {
	const [showErrorDetails, setShowErrorDetails] = useState(false);
	

  if (!error) return null;

  return (
    <Dialog open={!!error} onOpenChange={(open) => {
		  if (!open) {
			setShowErrorDetails(false);
			onClose();
	  	} 
    }}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="fixed bottom-4 right-4">
          Error Occurred
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            Something went wrong
            <DialogClose asChild>
              {/* <Button variant="destructive" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button> */}
            </DialogClose>
          </DialogTitle>
          <DialogDescription>
            An error occurred while processing your request.
            {!showErrorDetails && (
              <Button variant="link" onClick={() => setShowErrorDetails(true)}>
                Show more details
              </Button>
            )}
          </DialogDescription>
        </DialogHeader>
        {showErrorDetails && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <pre className="whitespace-pre-wrap">{error}</pre>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;