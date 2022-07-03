import React from "react";

const Cart = (props) => {
  const data = props.data;

  return (
    <div>
      <div className="mb-3">
        <table className="table caption-top">
          <caption>List of items that have been selected</caption>
          <thead>
            <tr>
              <th scope="col">SL No.</th>
              <th scope="col">Item name</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p, i) => {
              return (
                <tr>
                  <th scope="row">{i + 1}</th>
                  <td>
                    {" "}
                    <small>{p.name.slice(0, 10)} </small>
                  </td>
                  <td>
                    {" "}
                    <button
                      className="btn"
                      onClick={() => props.decrement(p.id)}
                    >
                      -
                    </button>{" "}
                    <span style={{ backgroundColor: "white", padding: "5px" }}>
                      {" "}
                      {p.qty}{" "}
                    </span>
                    <button
                      className="btn"
                      onClick={() => props.increment(p.id)}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    {p.price * p.qty}{" "}
                    <button
                      className="btn"
                      onClick={() => props.removeFromCart(p.id)}
                    >
                      x
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
