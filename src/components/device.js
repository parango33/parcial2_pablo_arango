import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

const Device = (props)=>{


    return(
        <div className="col-sm-3">
        <table className="table">
            <thead className="thead-light">
            <tr>
                <th scope="col"> #</th>
                <th scope="col"> Id</th>
                <th scope="col"><FormattedMessage id='Device'/> </th>
                <th scope="col"> <FormattedMessage id='Value'/></th>
            </tr>
            </thead>
        <tbody>
          {console.log("selected Room", props.roomSel)}
          {console.log("selected Room Devices", props.roomSel.devices)}
          {props.roomSel.devices && props.roomSel.devices.map((e, i) => (
            <tr key={i}>
                <th scope="row">{i}</th>
                <td>{props.roomSel.devices && props.roomSel.devices[i].id}</td>
                <td>{props.roomSel.devices && props.roomSel.devices[i].name}</td>
                <td>{props.roomSel.devices && props.roomSel.devices[i].desired.value}</td>
            </tr>    
          ))}
        </tbody>

      </table>
        </div> 
    )
}

export default Device;