import BookCard from './BookCard';

export default function BookList({books, onToggle, onDelete}) {
    return (
        <section>
            <ul className="book-list">
                {books.map(book =>
                    <BookCard
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        read={book.read}
                        handleToggle={onToggle}
                        handleDelete={onDelete}
                    />
                )}
            </ul>
        </section>
    )
}