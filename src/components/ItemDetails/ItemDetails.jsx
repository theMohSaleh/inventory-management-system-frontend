import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as itemService from "../../services/itemService";
import Loading from "../Loading/Loading";
import { AuthedUserContext } from "../../App";

const ItemDetails = () => {
  const { itemId } = useParams();
  const user = useContext(AuthedUserContext);
  const navigate = useNavigate(); // Use navigate for navigation

  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const itemData = await itemService.getItem(itemId);
        setItem(itemData);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };
    fetchItem();
  }, [itemId]);

  const handleAddToCart = async () => {
    try {
      await itemService.addItemToCart(itemId, user._id);
      navigate("/cart");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await itemService.deleteItem(itemId);
      navigate("/");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (!item) return <Loading />;

  return (
    <main>
      <header>
        <p>{item.category.toUpperCase()}</p>
        <h1>{item.name}</h1>
        <p>Description: {item.description}</p>
        <p>Quantity: {item.quantity}</p>
        {item.price && <p>Price: ${item.price}</p>}
        <p>
          {user.username} posted on {new Date(item.createdAt).toLocaleDateString()}
        </p>
        {user._id === item.owner && (
          <>
            <Link to={`/items/${itemId}/edit`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
        <button onClick={handleAddToCart}>Add to Cart</button>
      </header>
    </main>
  );
};

export default ItemDetails;
