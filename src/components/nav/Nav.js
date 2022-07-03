import { useState } from "react";

const Nav = () => {
  const [filterResult, setFilterResult] = useState({});
  const [isSelectedValue, setIsSelectedValue] = useState(false);

  function handleChange(event) {
    setFilterResult({ value: event.target.value });
    setIsSelectedValue(true);
  }
  return (
    <form>
      <input className="m-1 p-1" type="search" placeholder="search" />
      <select className="m-1 p-1" value="" onChange={handleChange}>
        <option selected>...</option>
        <option value="tag1">tag1</option>
        <option value="tag2">tag2</option>
        <option value="tag3">tag3</option>
        <option value="tag4">tag4</option>
        <option value="tag5">tag5</option>
        <option value="tag6">tag6</option>
      </select>
      <select className="m-1 p-1" value="" onChange={handleChange}>
        <option selected>...</option>
        <option value="select1">select1</option>
        <option value="select2">select2</option>
        <option value="select3">select3</option>
        <option value="select4">select4</option>
      </select>
      {isSelectedValue && (
        <span className="m-1 p-1">
          {" "}
          {filterResult.value}{" "}
          <button
            onClick={() => setIsSelectedValue(false)}
            type="button"
            className="btn-close m-1 p-1"
            aria-label="Close"
          ></button>{" "}
        </span>
      )}
    </form>
  );
};

export default Nav;
