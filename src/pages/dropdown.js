import React, { useEffect, useState } from  'react'
import { Link } from 'react-router-dom'

function DropDown(props){
    const [open,setOpen] = useState(false)

    const openMenu = (e) => {
      e.preventDefault()
    console.log(e.target.classList);
    setOpen(!open)
  }

    return(
        <div className="dropdown is-center is-right is-hoverable">
  <div class="dropdown-trigger" >
    <button class="button " aria-haspopup="true" aria-controls="dropdown-menu" >
      <span> <i className="fa fa-user-o" aria-hidden="true"></i></span>
      <span className="icon is-small">
        <i className="fa fa-angle-down open-menus" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div className="dropdown-menu" id="dropdown-menu" role="menu">
    <div className="dropdown-content">
    <Link className="dropdown-item" to={`/profile/${props.user.id}`}>
        Profile
    </Link>
    <Link className="dropdown-item" to='/edit-profile/'>
        Setting
    </Link>
      <hr className="dropdown-divider" />
      <Link className="dropdown-item" to='#' onClick={props.Logout}>
        Lgout
      </Link>
    </div>
  </div>
</div>
    )
}

export default  DropDown;

