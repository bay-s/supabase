import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import supabase from '../supabase-config';
import Avatar from './avatar';



const ChangePassword = (props) => {

  const {value} = useContext(AppContext);
  const [users,setUsers] = useState({
    password:'',
    newPassword:'',
    confPassword:''
  })
  
  const [message,setMessage] = useState({
    error:false,
    sukses:false,
    pesan:''
  })
  const [isSubmit,setIsSubmit] = useState(false)
  const handlerChange = (e) => {
    const {name,value} = e.target
    if(value.length > 0 ){
      setIsSubmit(true)
    }else{
      setIsSubmit(false)
    }
    let updatedValue = {};
    updatedValue = {
      [name]:value
    };
    setUsers(users => ({
         ...users ,
         ...updatedValue,
       }));
console.log(users);
  }

  const changePassword = async (e) => {
    e.preventDefault()
    const newPass = users.newPassword
    if(!users.newPassword || !users.confPassword){
      setMessage({
        error:true,
        sukses:false,
        pesan:'Input field required'
      })
      return
     }if(users.newPassword !== users.confPassword){
      setMessage({
        error:true,
        sukses:false,
        pesan:'Confirm password not the same'
      })
      return
     }
    const { user, error } = await supabase.auth.update({password:newPass})
    if(user){
      console.log(user)
      setMessage({
        error:false,
        sukses:true,
        pesan:'Change Password sukses'
      })
    }
    if(error){
      setMessage({
        error:true,
        sukses:false,
        pesan:`Something wrong ${error.message}`
      })
    }
  }
    return(
<div className='container p-3'>
<Avatar id={props.id} />
    <form className='is-flex is-flex-column is-flex-gap-md py-4' onSubmit={changePassword }>
     {/* NEW PASSWORD */}
    <div class="field">
  <p class="control has-icons-left ">
    <input class="input is-link has-text-dark" type="password" name='newPassword' placeholder="New Password" onChange={handlerChange}/>
    <span class="icon is-small is-left">
      <i class="fa fa-lock"></i>
    </span>
  </p>
</div>
    {/* NEW PASSWORD */}
    <div class="field">
  <p class="control has-icons-left ">
    <input class="input is-link has-text-dark" name='confPassword'  type="password" placeholder="Confirm New Password" onChange={handlerChange}/>
    <span class="icon is-small is-left">
      <i class="fa fa-lock"></i>
    </span>
  </p>
</div>

<div className='is-flex is-flex-column'>
   {isSubmit ?  <button className='button is-info w-25' >Change Password</button> 
   :  <button className='button is-info w-25' disabled>Change Password</button>}
    <Link to='/reset-password/' className='is-size-7 text-info p-2'>Forgot password?</Link>
</div>

<article class={message.error ? "message is-danger" : 'hide'}>
    <div class="message-body">
    <i> {message.pesan}</i>
    </div>
    </article>
    <article class={message.sukses ? "message is-success" : 'hide'}>
    <div class="message-body">
    <i> {message.pesan}</i>
    </div>
</article>


    </form>
</div>
    )
}

export default ChangePassword ;