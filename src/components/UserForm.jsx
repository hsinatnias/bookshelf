import { useState } from "react";
import UserInputs from "./UserInputs.jsx";

export default function UserForm({onAdd}) {

    const [newBook, setNewBook] = useState({ title: "", author: "" });

    function handleInputChange(field, value) {
        setNewBook(prev => ({ ...prev, [field]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (newBook.title.trim() === "") return;
        onAdd(newBook);
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

        </form>
    );
}