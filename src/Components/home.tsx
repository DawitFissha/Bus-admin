import React from 'react'
import {Link} from 'react-router-dom'
export function Home(){
    return (
        <div>
          <h1>X Bus Home</h1>
          <nav
            style={{
              borderBottom: "solid 1px",
              paddingBottom: "1rem"
            }}
          >
            <Link to="/users">Users</Link> |{" "}
            <Link to="/routes">Routes</Link> |{" "}
            <Link to="/busses">Busses</Link> |{" "}
            <Link to="/schedules">Schedules</Link>
          </nav>
        </div>
      );
}