import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    setCart([...cart, item]);
  };

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <div className="App">
        <CartContext.Provider value={{ cart }}>
          <Navigation />
        </CartContext.Provider>
        {/* Routelar */}
        <main className="content">
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/cart">
            <CartContext.Provider value={{ cart, removeItem }}>
              <ShoppingCart />
            </CartContext.Provider>
          </Route>
        </main>
      </div>
    </ProductContext.Provider>
  );
}

export default App;
