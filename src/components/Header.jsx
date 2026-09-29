export default function Header({booksLength, readCount}) {
    return (
        <header className="header">
            <h1>My Book Shelf</h1>
            <p>You have {booksLength} books. Read: {readCount} / {booksLength}</p>
        </header>
    )
}
