import BookCard from './BookCard';

export default function BookList({books, onToggle, onDelete, onUpdate}) {
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
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                    />
                )}
            </ul>
        </section>
    )
}