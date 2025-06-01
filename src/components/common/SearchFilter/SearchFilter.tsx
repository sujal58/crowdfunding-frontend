import "./SearchFilter.css";

function SearchFilter() {
  return (
    <section className="search-filter" aria-label="Search and filter campaign">
      <input
        type="search"
        placeholder="Search Campaigns"
        aria-label="Search campaigns"
      />
      <select aria-label="Select category">
        <option>All Categories</option>
        <option>Health</option>
        <option>Education</option>
        <option>Medical</option>
        <option>Environment</option>
      </select>
    </section>
  );
}

export default SearchFilter;
