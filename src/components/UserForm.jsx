import { useState } from "react";
import UserInputs from "./UserInputs.jsx";

export default function UserForm({handleAdd}) {

    const [newBook, setNewBook] = useState({ title: "", author: "" });

    function handleInputChange(field, value) {
        setNewBook(prev => ({ ...prev, [field]: value }));
    }

    function handleSubmit() {
        if (newBook.title.trim() === "") return;
        handleAdd(newBook);
        setNewBook({ title: "", author: "" });
    }

    return (
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
            <button onClick={handleSubmit}>Add</button>

        </section>
    );
}