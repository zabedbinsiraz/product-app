import React from "react";

const Card = (props) => {
  return (
    <div
      className="card mb-3 bg-light shadow p-1 m-1"
      style={{ width: "320px", height: "200px" }}
    >
      <div className="row g-0">
        <div className="col-md-3 p-4">
          <img
            style={{ width: "150px", height: "150px" }}
            src="..."
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>

        <div className="col-md-9">
          <div className="row">
            <div className="card-body col-md-6">
              <h5 className="card-title">{props.product.name.slice(0, 10)}</h5>
            </div>
            <div className="col-md-6 mt-4 d-flex flex-wrap justify-content-center align-items-center">
              <div>
                <button
                  className="btn btn-secondary m-2 p-1"
                  onClick={() => props.addToCart(props.product.id)}
                >
                  Add to list
                </button>
              </div>
              <div>
                <button className="btn btn-secondary m-2 p-1">Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
