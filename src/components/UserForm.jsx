import { useState } from "react";
import UserInputs from "./UserInputs.jsx";

export default function UserForm({onAdd}) {

    const [newBook, setNewBook] = useState({ title: "", author: "" });
    const [error, setError] = useState("");

    function handleInputChange(field, value) {
        setNewBook(prev => ({ ...prev, [field]: value }));
        setError("");
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (newBook.title.trim() === "") {
            setError("Title is required");
            return;
        }
        const added = onAdd(newBook)
        if (!added) {
            setError("The book is already added");
            return;
        }
        setNewBook({ title: "", author: "" });
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>

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
            <button type="submit">Add</button>
            {error && <p className="form-error" role="alert">{error}</p>}

        </form>
    );
}