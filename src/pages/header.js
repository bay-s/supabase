import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabase-config'
import AnimasiEllipsis from './animasi-ellips'
import Avatar from './avatar'
import Button from './button'
import DropDown from './dropdown'
import NoResult from './no-result'



const  Header = (props) => {
   const [search,setSearch] = useState('')
   const [hide,setHide] = useState(false)
   const [dataSearch,setDataSearch] = useState([])
   const [loader,setLoader] = useState(true)
   useEffect(() => {
      document.addEventListener('click',function(e){
        if(!e.target.classList.contains('input')){
          console.log("Test");
          setHide(false)
        }else{
          console.log("oke");
          setHide(true)
          setSearch('')
        }

      })
   },[])
  const Logout = async e => {
    e.preventDefault()
    const { error } = await supabase.auth.signOut();
    console.log(error);
    console.log(props.isLogin);
  }

 const SearchUser = async (value) =>{
  const { data, error } = await supabase
  .from('users')
  .select()
  .ilike('username', `%${value}%`)
  if(data){
    setDataSearch(data)
    console.log(data);
    console.log(dataSearch);
  }if(error){
    console.log(`404 not found ${error.message}`);
  }
 }

 const HandlerChange = async (e) => {
   const {value,name} = e.target
   setSearch(value)
   if(value.length < 1){
    setHide(false)
    setDataSearch([])
   }else{
    setHide(true)
   }

   if(value.length < 1) {
    return
  }else{
    SearchUser(value)
  }

 }


return(
<header className='headers is-fixed-top py-2 has-background-white shadow' >
<nav class="navbar mx-5 is-flex align-center justify-between bg-transparent" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
     <h2 className='is-size-3 has-text-dark has-text-weight-bold main-title'>
<Link to='/' className='has-text-dark '>
        Simple Sosmed
</Link>
     </h2>
  </div>


<div className={props.isLogin ? 'mx-auto search is-hidden-mobile' : 'hide' }>
  <form className={hide ? 'is-flex mt-4 dropdown is-active z-index' : 'is-flex mt-4 dropdown'} onSubmit={SearchUser}>
  <div className="control has-icons-left has-icons-right">
    <input className="input " type="text" placeholder="Search user" autoComplete="off" name='search' onChange={HandlerChange }/>
    <span className="icon is-small is-right">
      {!hide ?  <i className="fa fa-search is-clickable"></i> :
      <i className="fa fa-times is-clickable" aria-hidden="true" ></i>
      }
    </span>
  </div>
  <div className="dropdown-menu w-100" id="dropdown-menu" role="menu">
    <div className="dropdown-content px-2">
    {dataSearch.length < 1 ? <NoResult /> : 
    dataSearch.map(user => {
      return <Avatar key={search} id={user.uid}/>
     })
    }
    </div>
  </div>
  </form>
</div> 



<div className=' is-align-items-center p-0 m-0 mx-5 me-auto headers-top'>
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

