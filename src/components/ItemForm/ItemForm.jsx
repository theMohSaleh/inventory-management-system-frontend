import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as itemService from '../../services/itemsService';

const ItemForm = (props) => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    category: 'Classroom Materials',
  });

  useEffect(() => {
    if (itemId) {
      const fetchItem = async () => {
        try {
          const itemData = await itemService.show(itemId);
          setFormData(itemData);
        } catch (error) {
          console.error('Error fetching item:', error);
        }
      };
      fetchItem();
    }
  }, [itemId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (itemId) {
      props.handleEditItem(formData, itemId);
    } else {
      props.handleAddItem(formData);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <h1>{itemId ? 'Edit Item' : 'Add New Item'}</h1>
        <label htmlFor="name-input">Name</label>
        <input
          required
          type="text"
          name="name"
          id="name-input"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="description-input">Description</label>
        <textarea
          required
          name="description"
          id="description-input"
          value={formData.description}
          onChange={handleChange}
        />
        <label htmlFor="quantity-input">Quantity</label>
        <input
          required
          type="number"
          name="quantity"
          id="quantity-input"
          value={formData.quantity}
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Classroom Materials">Classroom Materials</option>
          <option value="Art Supplies">Art Supplies</option>
          <option value="Sports Equipment">Sports Equipment</option>
          <option value="Music Instruments">Music Instruments</option>
          <option value="Library Resources">Library Resources</option>
          <option value="Office Supplies">Office Supplies</option>
        </select>
        <button type="submit">{itemId ? 'Update Item' : 'Add Item'}</button>
      </form>
    </main>
  );
};

export default ItemForm;
