import {useState, useEffect} from 'react';
import UserForm from "./components/UserForm.jsx";
import Header from "./components/Header.jsx";
import FilterBar from "./components/FilterBar.jsx";
import BookList from "./components/BookList.jsx";
import BookSearch from "./components/BookSearch.jsx";

const initialBooks =[
  {id: 1, title: "Clean Code", author: "Robert C. Martin", read: false},
  {id: 2, title: "The Pragmatic Programmer", author: "Andy Hunt", read: true},
  {id: 3, title: "Atomic Habits", author: "James Clear", read: false}
];
function App(){
  const [books, setBooks] = useState(()=>{
    try{
      return JSON.parse(localStorage.getItem("books")) ?? initialBooks;
    }catch(err){
      return initialBooks;
    }

  });
  const [filter, setFilter] = useState("all");
  useEffect(()=>{
    localStorage.setItem("books", JSON.stringify(books))
  }, [books])

  function handleToggle(id){
    setBooks(prevBooks=>
      prevBooks.map(book =>
        book.id === id ? {...book, read: !book.read} : book
      )
    );
  }

  function handleDelete(id){

    setBooks(prevBooks=>
        prevBooks.filter(book=>
        book.id !== id 
    ));
  }
  function handleAdd(newBook){

    setBooks((prevBook) =>{
      return [...prevBook, {...newBook, id: Date.now(), read: false}];
    })
  }

  function handleFilterChange(option){
    setFilter(option);
  }

  const readCount = books.filter(book=> book.read).length;
  const booksLength = books.length;
  const visibleBooks = books.filter((book)=>{

    if(filter === "all"){
      return true;
    }else if(filter === "read"){
      return book.read;
    }else{
      return !book.read;
    }
  });

  return <>
    <Header booksLength={booksLength} readCount={readCount}  />
    <UserForm onAdd={handleAdd}  />
    <BookSearch onAdd={handleAdd}/>
    <FilterBar filter={filter} onFilterChange={handleFilterChange} />
    <BookList books={visibleBooks} onToggle={handleToggle} onDelete={handleDelete} />
  </>
}

export default App