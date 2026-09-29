
export default function FilterBar({filter, onFilterChange}) {

    const filterOptions = ["all", "read", "unread"];
    return (
        <section className="filters">

            {filterOptions.map(option =>(
                <button

                    key={option}
                    className={filter === option ? "filter-btn active" : "filter-btn"}
                    onClick={()=>onFilterChange(option)}
                >
                    {option}
                </button>
            ))}
        </section>
    )
}