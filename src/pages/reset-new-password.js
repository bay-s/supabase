import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom'
import banners from '../banner.jpg'
import supabase from '../supabase-config'


function NewPassword(props){
   const [newPassword,setNewPassword] = useState('')
   const [pesan,setPesan] = useState('')
   const [error,setError] = useState(false)
   const [isSubmit,setIsSubmit] = useState(false)
   const [sukses,setSukses] = useState(false)
   const [change,setChange] = useState(null)

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {

      if (event == 'PASSWORD_RECOVERY') {
        console.log("resseto");
        setChange(true)
      }
    })
  }, [])

const HandlerChange = (e) => {
    const {value,name} = e.target
    setNewPassword(value)
  }

const ResetPasswords = async (e) => {
    e.preventDefault()
    if(change){
      const { data, error } = await supabase.auth.update({
        password: newPassword,
      })

      if (data){
        alert("Password updated successfully!")
        console.log(data);
        window.location.href = "/login/";
      }
      if (error) alert("There was an error updating your password.")
    }
}  

  const banner =  {
    backgroundImage:`url(${banners})`,
    height:`${200}px`
  }
  return(

<div className='container mt-5 pt-4'>
<div class="modal is-active">
  <div class="modal-background"></div>
    <section class="column is-7 z-index is-vcentered is-centered ">
    <div className='columns is-centered '>
<div className='column is-6 box p-0 '>
<div className='banner' style={banner}></div>
<div className='is-flex justify-between align-center p-3'>
<h4 className='is-title is-size-6'>
    Reset your password
</h4>
 <Link to='/login/' className='has-text-primary is-title'>Login</Link>
</div>
<form class="field is-flex is-flex-column is-flex-gap-md p-3" onSubmit={ResetPasswords}>
<input class="input is-large" type="password" name='password' placeholder="Password" onChange={HandlerChange}/>

<article class={error ? "message is-danger" : 'hide'}>
    <div class="message-body">
    <i> {pesan}</i>
    </div>
    </article>
    <article class={sukses ? "message is-success" : 'hide'}>
    <div class="message-body">
    <i> {pesan}</i>
    </div>
    </article>
    
    <div class="field">
    <p class="control ">
    
    {isSubmit ? <button class="button is-primary is-loading is-fullwidth is-title " disabled>
    Submit
    </button>: <button type='submit' class="button is-primary is-fullwidth is-title">
    Submit
    </button>}
    </p>
    </div>
 </form>
</div>
      </div>
            {/* END COLUMNS */}
    </section>
</div>
</div>
       )

}

export default NewPassword;



