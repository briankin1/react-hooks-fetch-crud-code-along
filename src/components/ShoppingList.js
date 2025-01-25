import React, { useEffect, useState } from 'react';
import ItemForm from './ItemForm';
import Item from './Item';

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    let isMounted = true; // Track whether the component is mounted

    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => {
        if (isMounted) {
          setItems(items);
        }
      });

    return () => {
      isMounted = false; // Cleanup function to set isMounted to false
    };
  }, []);

  function handleAddItem(newItem) {
    setItems([...items, newItem]);
  }

  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      return item.id === updatedItem.id ? updatedItem : item;
    });
    setItems(updatedItems);
  }

  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <ul className="Items">
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
