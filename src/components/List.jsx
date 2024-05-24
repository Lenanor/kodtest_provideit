import { Link } from "react-router-dom";

import "./List.css";
import Product from "./Product";

export default function List({ list }) {
  return (
    <div className="List">
      {list.map((item) => (
        <Link className="List_item" key={item.id} to={`/${item.id}`}>
          <Product product={item} />
        </Link>
      ))}
    </div>
  );
}
