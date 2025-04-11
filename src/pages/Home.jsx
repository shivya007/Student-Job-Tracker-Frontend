import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import JobForm from "../components/JobForm";
import JobFilter from "../components/JobFilter";
import { getJobs } from "../services/jobService";
import { handleError } from "../utils/handleError";
import ErrorAlert from "../components/ErrorAlert";
import { Loader } from "lucide-react";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [appliedFilter, setAppliedFilter] = useState({ status: "", date: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadJobs = async () => {
    try {
      setError("");
      const data = await getJobs();
      setJobs(data.getJobList);
      setFilteredJobs(data.getJobList);
      setIsLoading(false);
    } catch (err) {
      setError(handleError(err));
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleFilter = ({ status, date }) => {
    let filtered = [...jobs];
    let activeFilter = { status: "", date: "" };

    if (status) {
      filtered = filtered.filter((job) => job.status === status);
    }

    if (date) {
      filtered = filtered.filter(
        (job) => new Date(job.dateofApplication).toISOString().split("T")[0] === date
      );
    }
    setAppliedFilter(activeFilter);
    setFilteredJobs(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🎯 Student Job Tracker</h1>

      <ErrorAlert message={error} />

      <JobForm onAdd={loadJobs} />
      <br />
      <JobFilter onFilter={handleFilter} />

      {
  isLoading ? (
    <h1><Loader className="animate-spin w-12 h-12 text-gray-600"/></h1>
  ) : (
    filteredJobs && filteredJobs.length > 0 ? (
      <div className="space-y-4 mt-4">
        {filteredJobs.map((job) => (
          <JobCard key={job._id} job={job} onUpdate={loadJobs} />
        ))}
      </div>
    ) : (
      <div className="text-center text-gray-600 mt-6">
        <p className="text-lg font-medium">No jobs found for the selected filter.</p>
        {appliedFilter.status && (
          <p>Status: <span className="font-semibold text-blue-700">{appliedFilter.status}</span></p>
        )}
        {appliedFilter.date && (
          <p>Date: <span className="font-semibold text-green-700">{appliedFilter.date}</span></p>
        )}
      </div>
    )
  )
}


    </div>
  );
};

export default Home;
