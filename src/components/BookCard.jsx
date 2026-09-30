import { useState } from "react";

export default function BookCard({title, author, read, id,  onToggle, onDelete, onUpdate}) {
	const [draft, setDraft] = useState({title:"", author:""});
	const [isEditing	, setIsEditing] = useState(false);
	const [error, setError] = useState(null);

	function handleEdit() {
		setIsEditing(true);
		setError(null);
		setDraft({title: title, author: author});
	}

	function handleSave(event) {
		event.preventDefault();

		if (draft.title.trim() === "") {
			setError("Title is required.");
			return;
		}
			const updateStatus = onUpdate(id, draft);
			if (updateStatus) {
				setIsEditing(false);
				setError(null);
			}else{
				setError("Book with same title already exists!");
			}


	}
	function handleChange(value, type){
		setDraft(prevDraft =>({...prevDraft,[type]: value}));
		setError(null);
	}
	function handleCancel(){
		setIsEditing(false);
		setDraft({title:"", author:""});
	}

	
	return(
		<li className={read && !isEditing ? "book-card read" : "book-card"}>
			{isEditing ?
				<>

				<form onSubmit={handleSave}>
					<input value={draft.title} onChange={e=>handleChange(e.target.value, "title", )} type="text" placeholder="Title"  />
					<input value={draft.author} onChange={e=>handleChange(e.target.value, "author")} type="text" placeholder="Author"  />
					<button type="submit">Update</button>
					<button type="button" onClick={handleCancel}>Cancel</button>
				</form>
				{error && <p className="form-error" role="alert">{error}</p>}
				</>

			:
				<>
					<h3>{title}</h3>
					<p>{author}</p>
					<p>{read ? "✅ Read": "📖 Not read yet"}</p>
					<button onClick={()=>onToggle(id)}>Toggle Read</button>
					<button className="delete-btn" onClick={()=>onDelete(id)}>Delete</button>
					<button className="update-btn" onClick={handleEdit}>Edit</button>
				</>

			}


		</li>
	)
}