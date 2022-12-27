import React from "react";
import { useState } from "react";
const initUsers = [
  { id: 1, name: "user1", surname: "surn1", age: 30 },
  { id: 2, name: "user2", surname: "surn2", age: 31 },
  { id: 3, name: "user3", surname: "surn3", age: 32 },
];
function UserOne({ key, id, name, type, changeinput }) {
  const [edit, setEdit] = useState(false);
  return (
    <span>
      {edit ? (
        <input
          key={key}
          value={name}
          onChange={(event) => changeinput(id, type, event)}
          onBlur={() => setEdit(false)}
        ></input>
      ) : (
        <span
          key={key}
          onClick={() => {
            setEdit(true);
          }}
        >
          {name}
        </span>
      )}{" "}
    </span>
  );
}
function User({ key, id, name, surname, age, changeinput }) {
  return (
    <div>
      <UserOne
        key={key}
        id={id}
        name={name}
        type="name"
        changeinput={changeinput}
      ></UserOne>
      <UserOne
        key={key}
        id={id}
        name={surname}
        type="surname"
        changeinput={changeinput}
      ></UserOne>
      <UserOne
        key={key}
        id={id}
        name={age}
        type="age"
        changeinput={changeinput}
      ></UserOne>
    </div>
  );
}
function Users(props) {
  const [user, setUser] = useState(initUsers);
  function changeinput(id, type, event) {
    setUser(
      user.map((item, index) => {
        if (item.id == id) {
          item[type] = event.target.value;
        }
        return item;
      })
    );
  }
  const result = user.map((item, index) => {
    return (
      <div>
        <User
          key={item.id}
          id={item.id}
          name={item.name}
          surname={item.surname}
          age={item.age}
          changeinput={changeinput}
        ></User>
      </div>
    );
  });
  return <div>{result}</div>;
}
export default Users;
