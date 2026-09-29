export default function BookCard({title, author, read, id,  handleToggle, handleDelete}){

	
	return(
		<li className={read ? "book-card read" : "book-card"}>
			<h3>{title}</h3>
			<p>{author}</p>
			<p>{read ? "✅ Read": "📖 Not read yet"}</p>
			<button onClick={()=>handleToggle(id)}>Toggle Read</button>
			<button className="delete-btn" onClick={()=>handleDelete(id)}>Delete</button>
		</li>
	)
}