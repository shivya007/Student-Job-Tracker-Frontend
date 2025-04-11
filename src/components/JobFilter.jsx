import { useState } from "react";

const JobFilter = ({ onFilter }) => {
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const handleFilter = () => {
    onFilter({ status, date });
  };

  const resetFilters = () => {
    setStatus("");
    setDate("");
    onFilter({ status: "", date: "" });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border px-3 py-2 rounded-md cursor-pointer"
      >
        <option value="">All Statuses</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border px-3 py-2 rounded-md cursor-pointer"
      />

      <button
        onClick={handleFilter}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:transition-colors cursor-pointer"
      >
        Apply Filter
      </button>

      <button
        onClick={resetFilters}
        className="bg-gray-100 text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-600 hover:text-white transition-colors cursor-pointer"
      >
        Reset
      </button>
    </div>
  );
};

export default JobFilter;
