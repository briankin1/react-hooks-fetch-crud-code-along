import React, { useState } from 'react';

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSubmit(e) {
    e.preventDefault();
    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    };
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((r) => r.json())
      .then((newItem) => {
        onAddItem(newItem);
        setName(""); // Clear the input after submission
        setCategory("Produce"); // Reset category to default
      });
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label htmlFor="item-name">Name:</label>
      <input
        type="text"
        id="item-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Item Name"
        required
      />
      <label htmlFor="item-category">Category:</label>
      <select
        id="item-category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Bakery">Bakery</option>
        <option value="Dessert">Dessert</option> {/* Ensure Dessert is an option */}
      </select>
      <button type="submit">Add to List</button> {/* Ensure this matches your test */}
    </form>
  );
}

export default ItemForm;