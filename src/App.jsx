import { createBrowserRouter, RouterProvider, json } from "react-router-dom";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import ProductListPage from "./pages/ProductList";
import ProductDetailsPage from "./pages/ProductDetails";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ProductListPage />,
        loader: async () => {
          const response = await fetch("https://fakestoreapi.com/products");
          if (!response.ok) {
            throw json(
              {
                message: "Could not fetch product list 😔",
              },
              { status: 500 }
            );
          } else {
            return response;
          }
        },
      },
      {
        path: ":productId",
        element: <ProductDetailsPage />,
        loader: async ({ params }) => {
          const id = params.productId;
          const response = await fetch(
            "https://fakestoreapi.com/products/" + id
          );

          if (!response.ok) {
            throw json(
              {
                message: "Could not fetch the product you were looking for 😔",
              },
              { status: 500 }
            );
          } else {
            return response;
          }
        },
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;
