import React, { useEffect, useState } from  'react'
import { Link } from 'react-router-dom'

function DropDown(props){
    const [open,setOpen] = useState(false)

    const openMenu = (e) => {
      e.preventDefault()
    console.log(e.target.classList);
    setOpen(!open)
  }

  useEffect(() => {
    // document.addEventListener('mousedown',function(e){
    //   setOpen(false)
    // })
  },[])
    return(
        <div class={open ? "dropdown is-center is-active" : "dropdown"}>
  <div class="dropdown-trigger" >
    <button class="button " aria-haspopup="true" aria-controls="dropdown-menu" onClick={openMenu}>
      <span> <i class="fa fa-user-o" aria-hidden="true"></i></span>
      <span class="icon is-small">
        <i class="fa fa-angle-down open-menus" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
    <Link class="dropdown-item" to={`/profile/${props.user.id}`}>
        Profile
    </Link>
    <Link class="dropdown-item" to='/edit-profile/'>
        Setting
    </Link>
      <hr class="dropdown-divider" />
      <Link class="dropdown-item" to='#' onClick={props.Logout}>
        Lgout
      </Link>
    </div>
  </div>
</div>
    )
}

export default  DropDown;

