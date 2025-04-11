import { Alert } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <span>{message}</span>
    </Alert>
  );
};

export default ErrorAlert;