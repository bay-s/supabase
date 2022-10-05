import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabase-config'
import Button from './button'
import DropDown from './dropdown'


const  Header = (props) => {


  const Logout = async e => {
    e.preventDefault()
    const { error } = await supabase.auth.signOut();
    console.log(error);
    console.log(props.isLogin);
  }


return(
<header className='header py-3 shadow ' >
<nav class="navbar is-fixed-top mx-5 is-flex justify-between bg-transparent" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
     <h2 className='is-size-3 has-text-dark has-text-weight-bold main-title'>
<Link to='/' className='has-text-dark pt-1'>
        Simple Sosmed
</Link>
     </h2>
  </div>

{/* 

<div className={props.isLogin ? 'mx-auto search' : 'hide' }>
  <form className='is-flex mt-4'>
  <div class="control has-icons-left has-icons-right">
    <input class="input " type="text" placeholder="search user" />
    <span class="icon is-small is-left">
      <i class="fa fa-search "></i>
    </span>
  </div>
  </form>
</div> */}


<div className='is-flex is-align-items-center p-0 m-0 mx-5 me-auto'>
<ul className='is-flex is-align-items-center mt-2 mx-2 right-nav'>
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
 {props.isLogin ? <DropDown Logout={Logout} user={props.user} /> : <Button />}
 </li>
</ul>

</div>
</nav>
        </header>
)
}

export default Header;








{/* <nav class="navbar shadow " role="navigation" aria-label="main navigation">
  <div className='container'>
  <div class="navbar-brand">
    <Link class="navbar-item" to='/'>
      <h3 className='main-title is-bold is-size-3 has-text-info'>Ask It</h3>
    </Link>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div class="navbar-menu">
    <div class="navbar-start">

    <Link to="/" className='navbar-item'>Home</Link>
    <Link to="/login/" className='navbar-item'>Login</Link>
    <Link to="/register"  className='navbar-item'>Register</Link>
    <Link to="/create"  className='navbar-item'>Create New Smoothie</Link>

    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        {props.isLogin ? <DropDown Logout={Logout} user={props.user} /> : <Button />}
      </div>
    </div>
  </div>
  </div>
</nav> */}