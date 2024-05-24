import { useLoaderData } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";

import List from "../components/List";
import Button from "../components/Button";

const CATEGORIES = [
  "men's clothing",
  "women's clothing",
  "jewelery",
  "electronics",
];

export default function ProductListPage() {
  const loaderData = useLoaderData();

  const [listData, setListData] = useState(loaderData);
  const [listOutput, setListOutput] = useState(listData.slice(0, 8));
  const [pagination, setPagination] = useState(0);
  const [pickedCategories, setPickedCategories] = useState([]);

  const paginationMin = 0;
  const paginationMax = useMemo(
    () => Math.ceil(listData.length / 8),
    [listData.length]
  );

  useEffect(() => {
    const from = pagination * 8;
    const to = from + 8;
    setListOutput(listData.slice(from, to));
  }, [pagination, listData]);

  useEffect(() => {
    if (pickedCategories.length === 0) {
      setListData(loaderData);
    } else {
      const sortedByCategories = loaderData.filter((item) => {
        return pickedCategories.includes(item.category);
      });
      setListData(sortedByCategories);
    }
  }, [pickedCategories, loaderData]);

  const handlePagination = useCallback(
    (method) => {
      if (method === "subtract") {
        if (pagination - 1 < paginationMin) {
          setPagination(0);
        } else {
          setPagination((prev) => prev - 1);
        }
      }
      if (method === "add") {
        if (pagination + 1 === paginationMax) {
          setPagination(0);
        } else {
          setPagination((prev) => prev + 1);
        }
      }
    },
    [pagination, paginationMax]
  );

  const handleSortByPrice = useCallback(() => {
    const sortedByPrice = [...listData].sort((a, b) => a.price - b.price);
    setListData(sortedByPrice);
  }, [listData]);

  const handleSortByCategory = useCallback((category) => {
    setPickedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  }, []);

  return (
    <>
      <h1>Our Products</h1>
      <div>
        <div>
          <Button
            type="button"
            text="Filter by price"
            aria-label="Sort by price"
            onClickButton={handleSortByPrice}
          />
          <div>
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                type="button"
                text={category}
                isActive={pickedCategories.includes(category)}
                aria-label={`Filter by ${category}`}
                onClickButton={() => handleSortByCategory(category)}
              />
            ))}
          </div>
        </div>
        <div>
          <Button
            type="button"
            text="&lt;"
            aria-label="Previous page"
            onClickButton={() => handlePagination("subtract")}
          />
          <Button
            type="button"
            text="&gt;"
            aria-label="Next page"
            onClickButton={() => handlePagination("add")}
          />
        </div>
        <p className="List-pagination">
          {pagination + 1}/{paginationMax}
        </p>
      </div>
      <section>
        <List list={listOutput} />
      </section>
    </>
  );
}
