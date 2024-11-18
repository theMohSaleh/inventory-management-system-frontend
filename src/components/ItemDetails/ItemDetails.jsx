import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import * as itemService from "../../services/itemService";
import Loading from "../Loading/Loading";
import { AuthedUserContext } from "../../App";

const ItemDetails = props => {
  const { itemId } = useParams();
  const user = useContext(AuthedUserContext);

  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const itemData = await itemService.getItem(itemId);
      setItem(itemData);
    }
    fetchItem();
  },  [itemId])

  const handleEdit = () => {
    props.history.push(`/items/${itemId}/edit`);
  }
  const handleAddToCart = async () => {
    await itemService.addItemToCart(itemId, user._id);
    props.history.push("/cart");
  }

  const handleDelete = async () => {
    await itemService.deleteItem(itemId);
    props.history.push("/");
  }
  
  if (!item) return <Loading />

  return (
    <main>
        <header>
            <p>{item.category.toUpperCase}</p>
            <h1>{item.description}</h1>
            <p>
                {user.username} posted on {''}
                {new Date(item.createdAt).toLocaleDateString()}
            </p>
            {user._id === item.user._id && (
                <>
                    <Link to ={`/items/${itemId}/edit`}>Edit</Link>
                    <button onClick={handleDelete}> Delete </button>
                </>
                )}
                <button onClick={handleAddToCart}>Add item</button>
                <button onClick={handleEdit}>Edit item</button>

                <p>{item.description}</p>
                <p>{item.price}</p>
        </header>
        
    </main>
  )
}

export default ItemDetails;