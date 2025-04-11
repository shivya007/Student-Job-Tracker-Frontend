import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createJob } from "../services/jobService";
import { handleError } from "../utils/handleError";
import { useState } from "react";
import ErrorAlert from "./ErrorAlert.jsx";

const JobForm = ({ onAdd }) => {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    try {
      setError("");
      const postedData = await createJob(data);
      reset();
      onAdd();
    } catch (err) {
      setError(handleError(err));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <ErrorAlert message={error} />
      <Input placeholder="Company" {...register("company", { required: true })} />
      <Input placeholder="Role" {...register("role", { required: true })} />
      <Input placeholder="Link to Job" {...register("link", { required: true })} />
      <Input type="date" {...register("dateofApplication", { required: true })} />
      <select {...register("status")} className="w-full p-2 border rounded-md">
        <option value="Applied" defaultValue>Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <Button type="submit" className="cursor-pointer">Add Job</Button>
    </form>
  );
};

export default JobForm;
