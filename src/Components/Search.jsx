import React, { useEffect, useState } from "react";

const Search = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_HOST}/api/Students`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch student data");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setFilterData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching student data:", err);
        setLoading(false);
      });
  }, []);

  const handleFilter = (value) => {
    setQuery(value);
    const lowercasedValue = value.toLowerCase();

    const res = filterData.filter((f) => {
      return (
        f.firstName.toLowerCase().includes(lowercasedValue) ||
        f.lastName.toLowerCase().includes(lowercasedValue) ||
        f.email.toLowerCase().includes(lowercasedValue) ||
        f.program.toLowerCase().includes(lowercasedValue) ||
        f.address.toLowerCase().includes(lowercasedValue) ||
        f.age.toString().includes(lowercasedValue)
      );
    });
    setData(res);
  };

  return (
    <div>
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="table-search-users"
          className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search for users"
          onChange={(e) => handleFilter(e.target.value)}
        />
      </div>
      <div>
        {query && data && Array.isArray(data) && data.length > 0
          ? data.map((d, i) => (
              <div className="">
                <div key={i}>
                  {d.firstName} {d.lastName} - {d.email} - {d.program} -{" "}
                  {d.address} - {d.age}
                </div>
              </div>
            ))
          : query && <div>No results found</div>}
      </div>
    </div>
  );
};

export default Search;
