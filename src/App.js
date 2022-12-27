import React from "react";
import Product from "./product.js";
import Users from "./users.js";
import Employee from "./employee.js";
import { useState, useRef } from "react";
let initNotes = [];
function App() {
  let a = JSON.parse(localStorage.getItem("key"));
  let number = 2;
  if (localStorage.length == 0) {
    a = initNotes;
  }
  if (window.location.href != "http://localhost:3000/") {
    let a = {};
    let link = window.location.href;
    link = link.slice(22);
    console.log(link);
    let g = [];
    for (;;) {
      debugger;
      a.id = Number(link.slice(link.indexOf("=") + 1, link.indexOf("&")));
      link = link.slice(link.indexOf("&") + 1);
      a.name = link.slice(link.indexOf("=") + 1, link.indexOf("&"));
      link = link.slice(link.indexOf("&") + 1);
      a.text = link.slice(link.indexOf("=") + 1, link.indexOf("&"));
      link = link.slice(link.indexOf("&") + 1);
      a.isReady = link.slice(link.indexOf("=") + 1, link.indexOf("&"));
      if (a.isReady == "false") {
        a.isReady = false;
      } else a.isReady = true;
      link = link.slice(link.indexOf("&") + 1);
      a.isRedact = link.slice(link.indexOf("=") + 1, link.indexOf("&"));
      if (a.isRedact == "false") {
        a.isRedact = false;
      } else a.isRedact = true;
      link = link.slice(link.indexOf("&") + 1);
      if (link.indexOf("&") == -1) {
        a.isEdit = link.slice(link.indexOf("=") + 1);
      } else a.isEdit = link.slice(link.indexOf("=") + 1, link.indexOf("&"));
      if (a.isEdit == "false") {
        a.isEdit = false;
      } else a.isEdit = true;
      link = link.slice(link.indexOf("&") + 1);
      g.push(a);
      a = {};
      if (link.length == 13 || link.length == 14 || link.length == 12) {
        number = g[g.length - 1].id;
        break;
      }
    }
    debugger;
    if (
      JSON.parse(localStorage.getItem("key")) !== null &&
      JSON.parse(localStorage.getItem("key")).length !== 0
    ) {
      if (
        [JSON.parse(localStorage.getItem("key")).length - 1].id !==
        g[g.length - 1].id
      ) {
        localStorage.setItem(
          "key",
          JSON.stringify([...JSON.parse(localStorage.getItem("key"))])
        );
      }
    } else localStorage.setItem("key", JSON.stringify([...g]));
  }
  console.log(a);
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [text, setText] = useState(a);
  const [value2, setValue2] = useState("");
  const [value, setValue] = useState(number);
  const [value3, setValue3] = useState("");
  const [searchitems, setSearchitems] = useState([]);
  const dragStart = (event, position) => {
    dragItem.current = position;
  };
  const dragEnter = (event, position) => {
    dragOverItem.current = position;
  };
  function copy() {
    debugger;
    let str = "";
    for (let i = 0; i < text.length; i++) {
      for (let key in text[i]) {
        if (str != "") {
          str += "&";
        }
        str += key + "=" + encodeURIComponent(text[i][key]);
      }
    }
    let a = new URL(str, "http://localhost:3000/").href;
    navigator.clipboard.writeText(a);
    console.log(decodeURI(a));
    console.log(a);
  }
  const drop = (event) => {
    debugger;
    const copyListItems = [...text];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setText(copyListItems);
    localStorage.setItem("key", JSON.stringify([...copyListItems]));
  };
  function add(text1) {
    debugger;
    let name = text1.split("\n")[0];
    if (name.length > 10) {
      name = name.slice(0, 10);
    }
    let a = {};
    a.id = Number(value) + 1;
    a.name = name;
    a.text = text1;
    a.isReady = false;
    a.isEdit = false;
    a.isRedact = false;
    debugger;
    setText([...text, a]);
    setValue([Number(value) + 1]);
    debugger;
    localStorage.setItem("key", JSON.stringify([...text, a]));
  }
  function search() {
    debugger;
    let a = text.filter((item1, index) => {
      if (item1.text.includes(value3)) {
        return true;
      } else return false;
    });
    setSearchitems([...a]);
  }
  function showTextArea(id) {
    setText(
      text.map((item1, index) => {
        if (item1.id !== id && item1.isReady == true) {
          item1.isReady = false;
        }
        if (item1.id == id) {
          item1.isReady = !item1.isReady;
        }
        return item1;
      })
    );
  }

  const list = text.map((item, index) => {
    return (
      <ul style={{ listStyleType: "none" }}>
        <div
          style={{ display: "inline" }}
          draggable
          onDragStart={(event) => dragStart(event, index)}
          onDragEnter={(event) => dragEnter(event, index)}
          onDragEnd={drop}
        >
          <li onClick={() => {}}>{item.name}</li>

          {item.isEdit ? (
            <button
              onClick={() => {
                setText(
                  text.map((item1, index) => {
                    if (item1.id == item.id) {
                      item1.isReady = false;
                      item1.isEdit = !item1.isEdit;
                      item1.isRedact = !item1.isRedact;
                    }
                    return item1;
                  })
                );
              }}
            >
              Сохранить
            </button>
          ) : (
            <button
              onClick={() => {
                showTextArea(item.id);
                setText(
                  text.map((item1, index) => {
                    debugger;
                    if (item1.id == item.id) {
                      item1.isEdit = !item1.isEdit;
                      item1.isRedact = !item1.isRedact;
                      item1.isReady = true;
                    }
                    return item1;
                  })
                );
              }}
            >
              Редактировать
            </button>
          )}

          <button
            onClick={() => {
              let a = text.filter((item1, index) => {
                if (item1.id == item.id) {
                  return false;
                }
                return true;
              });
              setText(a);
              localStorage.setItem("key", JSON.stringify([...a]));
            }}
          >
            Удалить
          </button>
          {item.isReady ? (
            <textarea
              value={item.text}
              onChange={(event) => {
                let a = text.map((item1, index) => {
                  if (item1.id == item.id) {
                    debugger;
                    item1.name = event.target.value.split("\n")[0].slice(0, 10);
                    item1.text = event.target.value;
                  }
                  return item1;
                });
                setText(a);
                localStorage.setItem("key", JSON.stringify([...a]));
              }}
            ></textarea>
          ) : (
            <></>
          )}
        </div>
      </ul>
    );
  });
  return (
    <div>
      {list}
      <div>
        <button
          onClick={() => {
            add(value2);
          }}
        >
          Подтвердить
        </button>
        <textarea
          value={value2}
          onChange={(event) => {
            setValue2(event.target.value);
          }}
        ></textarea>
      </div>
      <div>
        <input
          value={value3}
          onChange={(event) => {
            setValue3(event.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            search();
          }}
        >
          Искать
        </button>
      </div>
      <div>
        <ul>
          {searchitems.map((item1, index) => {
            return <li>{item1.name}</li>;
          })}
        </ul>
      </div>
      <button onClick={copy}>Скопировать всё</button>
    </div>
  );
}

export default App;
