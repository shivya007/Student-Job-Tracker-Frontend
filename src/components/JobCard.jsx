import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { updateJob, deleteJob } from "../services/jobService";
import { handleError } from "../utils/handleError";
import ErrorAlert from "./ErrorAlert";

const JobCard = ({ job, onUpdate }) => {
  const [error, setError] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false); // modal state

  const handleStatusChange = async (newStatus) => {
    try {
      setError("");
      const updatedStatus = await updateJob(job._id, newStatus);
      onUpdate();
    } catch (err) {
      setError(handleError(err));
    }
  };

  const handleDelete = async () => {
    try {
      setError("");
      await deleteJob(job._id);
      onUpdate();
    } catch (err) {
      setError(handleError(err));
    }
  };

  const statusColors = {
    Applied: "bg-yellow-100 text-yellow-800",
    Interview: "bg-blue-100 text-blue-800",
    Offer: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };

  return (
    <>
    <Card className="mb-4 shadow-md">
      <CardContent className="p-4 space-y-2">
        <ErrorAlert message={error} />
        <h2 className="text-xl font-semibold">{job.company}</h2>
        <p className="text-sm text-gray-600">Role: {job.role}</p>
        <p className="text-sm text-gray-500">Applied on: {new Date(job.dateofApplication).toDateString()}</p>
        <a href={job.link} target="_blank" className="text-blue-600 text-sm underline">
          Job Link
        </a>&nbsp;&nbsp;&nbsp;
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[job.status]}`}
        >
          {job.status}
        </span>

        <div className="mt-3 flex flex-wrap gap-2">
          {["Applied", "Interview", "Offer", "Rejected"].map((status) => (
            <Button
              key={status}
              variant="outline"
              size="sm"
              onClick={() => handleStatusChange(status)}
              disabled={job.status === status}
              className="cursor-pointer disabled:cursor-not-allowed"
            >
              Mark {status}
            </Button>
          ))}

          <Button variant="destructive" size="sm" onClick={() => setOpenConfirm(true)} className="cursor-pointer disabled:cursor-not-allowed">
            Delete
          </Button>
          
        </div>
      </CardContent>
    </Card>

    <Dialog open={openConfirm} onOpenChange={setOpenConfirm}>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
      </DialogHeader>
      <p className="text-sm text-gray-600">This action cannot be undone. Do you really want to delete this job entry?</p>

      <DialogFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={() => setOpenConfirm(false)}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Yes, Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  </>

  );
};

export default JobCard;
