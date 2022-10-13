import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import supabase from '../supabase-config';
import Button from './button';
import DropDown from './dropdown';


function HeaderBottom(props){
let y = window.scrollX
  const header = useRef()
  const Logout = async e => {
    e.preventDefault()
    const { error } = await supabase.auth.signOut();
    console.log(error);
    console.log(props.isLogin);
  }

  useEffect(() => {
    window.addEventListener('scroll',scrolls)
  },[])
  const scrolls = (e) => {
    let x = window.scrollY;
    const headers = header.current
    if (x > y) {
      headers.classList.add("fixed-header");
    }else {
      headers.classList.remove("fixed-header");
    }
    
y = x;
  }
    return(      
<header className='header-bottom has-background-white shadow' ref={header }>
<div className=' p-0 m-0 mx-5 me-auto'>
<ul className='is-flex justify-evenly is-align-items-center mt-2 mx-2 right-nav'>
  <li className='navbar-item'><Link to='/'>
  <i  className="fa fa-home has-text-dark has-text-weight-bold is-size-5" aria-hidden="true"></i>
</Link></li>
  <li className='navbar-item'><a href='#0'>
  <i className="fa fa-bell-o has-text-dark has-text-weight-bold is-size-5" aria-hidden="true"></i>
  </a></li>
  <li className={props.isLogin ? 'navbar-item' : 'hide'}><a href='#0' onClick={props.openModal}>
  <i className="fa fa-plus-square-o has-text-dark has-text-weight-bold is-size-5" aria-hidden="true"></i>
  </a></li>
  <li className={props.isLogin ? 'navbar-item' : "hide"}><Link to='/message-list/'>
  <i className="fa fa-envelope-o has-text-dark has-text-weight-bold is-size-5" aria-hidden="true"></i>
</Link></li>
 <li className='navbar-item'>
 {props.isLogin ? <div class="dropdown is-hoverable is-up is-right">
 <div class="dropdown-trigger" >
    <button class="button " aria-haspopup="true" aria-controls="dropdown-menu" >
      <span> <i className="fa fa-user-o" aria-hidden="true"></i></span>
      <span className="icon is-small">
        <i className="fa fa-angle-up open-menus" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu4" role="menu">
  <div className="dropdown-content">
    <Link className="dropdown-item" to={`/profile/${props.user == null ? "" : props.user.id}`}>
        Profile
    </Link>
    <Link className="dropdown-item" to='/edit-profile/'>
        Setting
    </Link>
      <hr className="dropdown-divider" />
      <Link className="dropdown-item" to='#' onClick={Logout}>
        Lgout
      </Link>
    </div>
  </div>
</div> : <Button />}
 </li>
</ul>
</div>
</header>
    )
}

export default HeaderBottom;