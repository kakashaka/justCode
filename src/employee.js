import React from "react";
import { useState } from "react";
function Employee(props){
    return <div>
        name:  <span>  {props.name}  </span>,
        surname:  <span>  {props.surname}  </span>,
        cost:  <span>  {props.cost}  </span>
    </div>

}
export default Employee