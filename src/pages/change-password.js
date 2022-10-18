import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Avatar from './avatar';

const ChangePassword = (props) => {
  const [user,setUser] = useState({
    email:'',
    oldPassword:''
  })

  const handlerChange = (e) => {
    const {name,value} = e.target
  }

  

  const userLogin = async (e) => {
    e.preventDefault()

   
      //   const { user, session, error } = await supabase.auth.signIn({
      //   email:email,
      //   password:password,
      //   })

      // if(error){
      //   console.log(error);
      // }
      // if(user){
      //   console.log(user);
      // }

  }
  
    return(
<div className='container p-3'>
<Avatar id={props.id} />
    <form className='is-flex is-flex-column is-flex-gap-md py-4'>

    
<div class="field">
  <p class="control has-icons-left has-icons-right">
    <input class="input is-link" type="email" name='email' placeholder="Email" />
    <span class="icon is-small is-left">
      <i class="fa fa-envelope"></i>
    </span>
    <span class="icon is-small is-right">
      <i class="fa fa-check"></i>
    </span>
  </p>
</div>

    {/* OLD PASSWORD */}
<div class="field">
  <p class="control has-icons-left ">
    <input class="input is-link has-text-dark" type="password" placeholder="Old Password" />
    <span class="icon is-small is-left">
      <i class="fa fa-lock"></i>
    </span>
  </p>
</div>
     {/* NEW PASSWORD */}
    <div class="field">
  <p class="control has-icons-left ">
    <input class="input is-link has-text-dark" type="password" placeholder="New Password" />
    <span class="icon is-small is-left">
      <i class="fa fa-lock"></i>
    </span>
  </p>
</div>
    {/* NEW PASSWORD */}
    <div class="field">
  <p class="control has-icons-left ">
    <input class="input is-link has-text-dark" type="password" placeholder="Confirm New Password" />
    <span class="icon is-small is-left">
      <i class="fa fa-lock"></i>
    </span>
  </p>
</div>

<div className='is-flex is-flex-column'>
    <button className='button is-info w-25' disabled>Change Password</button>
    <Link to='/reset-password/' className='is-size-7 text-info p-2'>Forgot password?</Link>
</div>
    </form>
</div>
    )
}

export default ChangePassword ;