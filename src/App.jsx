import { useState } from 'react';
import BookCard from "./components/BookCard.jsx";
import UserInputs from "./components/UserInputs.jsx";
const initialBooks =[
  {id: 1, title: "Clean Code", author: "Robert C. Martin", read: false},
  {id: 2, title: "The Pragmatic Programmer", author: "Andy Hunt", read: true},
  {id: 3, title: "Atomic Habits", author: "James Clear", read: false}
];
function App(){
  const [books, setBooks] = useState(initialBooks);
  const [newBook, setNewBook] = useState({ title: "", author: "" });
  const [filter, setFilter] = useState("all");

  const filterOptions = ["all", "read", "unread"];

  function handleToggle(id){
    setBooks(prevBooks=>
      prevBooks.map(book =>
        book.id == id ? {...book, read: !book.read} : book
      )
    );
  }


  function handleDelete(id){

    setBooks(prevBooks=>
        prevBooks.filter(book=>
        book.id !== id 
    ));
  }

 function handleInputChange(field, value) {
  setNewBook(prev => ({ ...prev, [field]: value }));
}

function handleAdd(){
  if (newBook.title.trim() === "") return;
  setBooks((prevBook) =>{
      const updatedBook = [...prevBook, {...newBook, id: Date.now(), read: false}];      
    return updatedBook;
  })
  setNewBook({ title: "", author: "" });
}

  let readCount = books.filter(book=> book.read).length;

  const visibleBooks = books.filter((book)=>{

    if(filter === "all"){
      return book;
    }else if(filter === "read"){
      return book.read;
    }else{
      return !book.read;
    }
  });

  return <>
  <header className="header">
    <h1>My Book Shelf</h1>
    <p>You have {books.length} books. Read: {readCount} / {books.length}</p>
  </header>
  <section className="add-form">

    <UserInputs
      inputType="title"
      value={newBook.title}
      onChange={e => handleInputChange("title", e.target.value)}
    />
    <UserInputs
      inputType="author"
      value={newBook.author}
      onChange={e => handleInputChange("author", e.target.value)}
    />
    <button onClick={handleAdd}>Add</button>

  </section>

  
    <section className="filters">

      {filterOptions.map(option =>(
          <button

          key={option}
          className={filter === "all" ? "filter-btn active" : "filter-btn"}
          onClick={()=> setFilter(option)}
          >
            {option}
          </button>
      ))}
    </section>

    <section>
      <ul className="book-list">
      {visibleBooks.map(book => 
       <BookCard 
        key={book.id} 
        id={book.id} 
        title={book.title} 
        author={book.author} 
        read={book.read} 
        handleToggle={handleToggle}
        handleDelete={handleDelete}
      />
    )}
    </ul>
    </section>
    
  </>
}

export default App