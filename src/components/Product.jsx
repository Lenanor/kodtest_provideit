import "./Product.css";

export default function Product({ product, ...props }) {
  const { category, id, image, price, title, description, rating } = product;
  const { isDetail = false } = props;

  return (
    <div className={`Product ${isDetail ? "Product-detail" : ""}`}>
      <div className="Product_image-wrapper">
        <img className="Product_image" src={image} alt="" />
      </div>
      <div className="Product_info">
        <h2 className="Product_title">{title}</h2>
        {isDetail && <p className="Product_description">{description}</p>}
        <div className="Product_details">
          <p className="Product_price">${price}</p>
          <span className="Product_category">{category}</span>
        </div>
      </div>
    </div>
  );
}
