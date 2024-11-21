import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthedUserContext } from '../../App';

const ItemList = (props) => {
  const user = useContext(AuthedUserContext);

  return (
    <main>
      <h1>Item List</h1>
      {props.items.map((item) => (
        <article key={item._id}>
          <Link to={`/items/${item._id}`}>
            <h2>{item.name}</h2>
          </Link>
          <p>Description: {item.description}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Category: {item.category}</p>

          <div>
            {/* Edit Button - Only if the user is the owner */}
            {user && user._id === item.owner && (
              <Link to={`/items/${item._id}/edit`}>
                <button>Edit</button>
              </Link>
            )}

            {/* Delete Button */}
            {user && user._id === item.owner && (
              <button onClick={() => props.handleRemoveItem(item._id)}>Delete</button>
            )}
          </div>
        </article>
      ))}
    </main>
  );
};

export default ItemList;
