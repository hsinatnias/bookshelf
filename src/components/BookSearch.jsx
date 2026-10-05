import {useRef, useState} from "react";

export default function BookSearch({onAdd, isOnShelf}) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const requestIdRef = useRef(0);


    async function handleSearch(event) {
        event.preventDefault();
        if(isLoading) return;
        if (query.trim() === "") return;

        const requestId  =  ++requestIdRef.current;

        setIsLoading(true);
        setErrors(null);
        try{
            const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`;

            const response = await fetch(url);
            if(!response.ok) {
                throw new Error(`Search failed (status ${response.status})`);
            }
            const json = await response.json();
            if(requestId !== requestIdRef.current) return
            setResults(json.docs);
            }catch(err){
            if(requestId !== requestIdRef.current) return
            setErrors(err.message);
        }finally{
            if (requestId === requestIdRef.current) {
                setIsLoading(false);
            }
        }
    }


    let content = null;

    if (isLoading) {
        content = <p className="search-status">Searching...</p>;
    } else if (errors) {
        content = <p className="search-status error">Error: {errors}</p>;
    } else if (results && results.length === 0) {
        content = <p className="search-status">No books found.</p>;
    } else if (results) {
        content = <div  className="table-wrapper">
            <table className="results-table">
                <thead>
                <tr>
                    <th>Book Title</th>
                    <th>First Author</th>
                    <th>First publish year</th>
                    <th>Add to Shelf</th>
                </tr>
                </thead>
                <tbody>

                { results.map((book) =>
                    {
                        const author = book.author_name?.[0] ?? "Unknown author";
                        const onShelf = isOnShelf(book.title);

                        return(
                            <tr key={book.key}>
                                <td >{book.title}</td>
                                <td >{author}</td>
                                <td >{book.first_publish_year}</td>
                                <td>{onShelf ?
                                    <button className="add-btn" disabled>On shelf</button> :
                                    <button className="add-btn" onClick={()=>onAdd({title:book.title, author:author})}>Add to Shelf</button>
                                }
                                </td>
                            </tr>
                        )
                    }


                )}


                </tbody>
            </table>
        </div>;
    }



    return(
        <section className="book-search">
            <label htmlFor="bookSearch">Search Open Library</label>
            <form className="search-bar" onSubmit={handleSearch}>
                <input id="bookSearch" type="text" placeholder="Search by title" onChange={(event)=>setQuery(event.target.value)} value={query} />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Searching..." : "Search"}
                </button>
            </form>
            {content}
        </section>
    )
}