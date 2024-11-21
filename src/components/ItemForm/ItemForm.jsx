// src/components/ItemForm/ItemForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as itemService from '../../services/itemsService';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

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
      navigate(`/items/${itemId}`);
    } else {
      props.handleAddItem(formData);
      navigate('/items');
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>{itemId ? 'Edit Item' : 'Add New Item'}</h1>
        <Form.Label htmlFor="name-input">Name</Form.Label>
        <Form.Control
          required
          type="text"
          name="name"
          id="name-input"
          value={formData.name}
          onChange={handleChange}
        />
        <Form.Label htmlFor="description-input">Description</Form.Label>
        <Form.Control
          required
          name="description"
          id="description-input"
          value={formData.description}
          onChange={handleChange}
        />
        <Form.Label htmlFor="quantity-input">Quantity</Form.Label>
        <Form.Control
          required
          type="number"
          name="quantity"
          id="quantity-input"
          value={formData.quantity}
          onChange={handleChange}
        />
        <Form.Label htmlFor="category-input">Category</Form.Label>
        <Form.Select
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
        </Form.Select>
        <Button className='mt-3' type="submit">{itemId ? 'Update Item' : 'Add Item'}</Button>
      </Form>
    </Container>
  );
};

export default ItemForm;
