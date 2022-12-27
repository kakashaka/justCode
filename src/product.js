import React from "react";
import { useState } from "react";
const initProds = [
  { id: 1, name: "prod1", cost: "cost1", catg: "catg1" },
  { id: 2, name: "prod2", cost: "cost2", catg: "catg2" },
  { id: 3, name: "prod3", cost: "cost3", catg: "catg3" },
];
function ProductField({ id, text, type, changeField }) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <td>
      {isEdit ? (
        <input
          value={text}
          onChange={(event) => changeField(id, type, event)}
          onBlur={() => setIsEdit(false)}
        />
      ) : (
        <span onClick={() =>{ setIsEdit(true)}}>{text}</span>
      )}
    </td>
  );
}
function Products({ id, name, cost, catg, changeField }) {
  return (
    <tr>
      <ProductField id={id} text={name} type="name" changeField={changeField} />
      <ProductField id={id} text={cost} type="cost" changeField={changeField} />
      <ProductField id={id} text={catg} type="catg" changeField={changeField} />
    </tr>
  );
}
function Product() {
  const [prods, setProds] = useState(initProds);

  function changeField(id, field, event) {
    setProds(
      prods.map((prod) => {
        if (prod.id == id) {
          prod[field] = event.target.value;
        }

        return prod;
      })
    );
  }

  const rows = prods.map((prod) => {
    debugger
    return (
      <Products
        key={prod.id}
        id={prod.id}
        name={prod.name}
        cost={prod.cost}
        catg={prod.catg}
        changeField={changeField}
      />
    );
  });

  return (
    <div>
      <table>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default Product;
