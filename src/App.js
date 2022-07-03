import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import Nav from "./components/nav/Nav";
import Card from "./components/card/Card";
import Cart from "./components/cart/Cart";

function App() {
  // all states are handled here
  const [data, setData] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // to fetch all products
  useEffect(() => {
    const url = "https://fec-inventory-api.herokuapp.com/product-info";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  // remove from listed products
  const removeFromCart = (id) => {
    const filterProducts = selectedProducts.filter(
      (product) => product.id !== id
    );
    setSelectedProducts(filterProducts);

    let total = 0;
    for (let i = 0; i < filterProducts.length; i++) {
      total = total + filterProducts[i].price * filterProducts[i].qty;
    }
    setTotal(total);
  };
  // product increment in the cart
  const increment = (id) => {
    const newArray = [...selectedProducts];
    const product = newArray.find((p) => p.id === id);
    product.qty++;

    setSelectedProducts(newArray);

    let total = 0;
    for (let i = 0; i < newArray.length; i++) {
      total = total + newArray[i].price * newArray[i].qty;
    }
    setTotal(total);
  };
  //product decrement in the cart
  const decrement = (id) => {
    const newArray = [...selectedProducts];
    const product = newArray.find((p) => p.id === id);
    if (product.qty > 0) {
      product.qty--;

      setSelectedProducts(newArray);
    }

    let total = 0;
    for (let i = 0; i < newArray.length; i++) {
      total = total + newArray[i].price * newArray[i].qty;
    }
    setTotal(total);
  };
  // add product to the cart
  const addToCart = (id) => {
    const selectedProduct = {
      id: "",
      name: "",
      qty: 1,
      price: 0,
    };

    const inventoryUrl = `https://fec-inventory-api.herokuapp.com/inventory-info?product_id=${id}`;
    const productUrl = `https://fec-inventory-api.herokuapp.com/product-info/${id}`;
    //fetch data from inventory url
    const fetchData = async (fetchData2) => {
      try {
        const response = await fetch(inventoryUrl);
        const json = await response.json();

        selectedProduct.price = json[0].unit_price;

        fetchData2();
      } catch (error) {
        console.log("error", error);
      }
    };
    //fetch data from product url
    const fetchData2 = async () => {
      try {
        const response = await fetch(productUrl);
        const json = await response.json();

        selectedProduct.name = json.name;
        selectedProduct.id = json.id;

        const oldProduct = selectedProducts.find((p) => p.id === json.id);
        let products;

        if (!oldProduct) {
          products = [...selectedProducts, selectedProduct];
          await setSelectedProducts(products);
          let sum = 0;
          for (let i = 0; i < products.length; i++) {
            sum = sum + products[i].price * products[i].qty;
          }
          setTotal(sum);
        } else {
          alert("already added to the cart");
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData(fetchData2);
  };
  // order confirm handler function
  const confirmHandle = () => {
    if (selectedProducts.length === 0) {
      setIsEmpty(true);
    } else {
      setIsSelected(true);
    }
  };

  return (
    <div className="bg-light">
      {/* page title */}
      <h1>Dashboard &gt; Supply Room</h1>

      {/* all modals here */}
      {isEmpty && (
        <div onClick={() => setIsEmpty(false)} className="drawer-background">
          <div className="drawer">
            <button
              className="btn btn-warning"
              onClick={() => setIsEmpty(false)}
            >
              please add product
            </button>
          </div>
        </div>
      )}

      {isSelected && (
        <div onClick={() => setIsSelected(false)} className="drawer-background">
          <div className="drawer">
            <p>{selectedProducts.length} product has been listed</p>
            <button
              className="btn m-3 p-3 btn-primary"
              onClick={() => setIsConfirmed(true)}
            >
              please confirm
            </button>
            <button
              className="btn m-3 p-3 btn-secondary"
              onClick={() => setIsSelected(false)}
            >
              close
            </button>
          </div>
        </div>
      )}
      {isConfirmed && (
        <div
          onClick={() => setIsConfirmed(false)}
          className="drawer-background"
        >
          <div className="drawer">
            <button
              className="btn m-3 p-3 btn-success"
              onClick={() => setIsConfirmed(false)}
            >
              ok
            </button>
          </div>
        </div>
      )}

      <Nav></Nav>

      <div className="container">
        <div className="row">
          <div className="col d-flex flex-wrap col-omd-7">
            {data.slice(0, 20).map((product) => (
              <Card addToCart={addToCart} product={product}></Card>
            ))}
          </div>
          <div
            style={{
              width: "1px",
              height: "100vh",
              borderLeft: "3px solid teal",
            }}
            className=" col-md-1"
          ></div>
          <div className="col col-lg-4 col-md-4 bg-light card p-2 shadow">
            <Cart
              data={selectedProducts}
              removeFromCart={removeFromCart}
              increment={increment}
              decrement={decrement}
              total={total}
            ></Cart>

            <div className="text-center">
              <h4>Total</h4>
              <h5>{total}</h5>
              <button
                onClick={() => confirmHandle()}
                style={{ marginTop: "30vh" }}
                className="btn btn-success"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
