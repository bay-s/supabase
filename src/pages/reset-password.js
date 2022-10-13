import React, { useState } from 'react'
import { Link} from 'react-router-dom'
import banners from '../banner.jpg'
import supabase from '../supabase-config'


function  ResetPassword(props){
   const [email,setEmail] = useState('')
   const [pesan,setPesan] = useState('')
   const [error,setError] = useState(false)
   const [isSubmit,setIsSubmit] = useState(false)
   const [sukses,setSukses] = useState(false)
   const [isExist,setIsExist] = useState(null)

  const banner =  {
    backgroundImage:`url(${banners})`,
    height:`${200}px`
  }
  
const HandlerChange = (e) => {
    const {value,name} = e.target
    setEmail(value)
  }

  const fetchData = async () => {
    const {data,error} = await supabase
    .from('users')
    .select()
    .eq('email',email)
    .single()
    if(error){
      console.log(error);
      setError(true)
      setIsSubmit(false)
      setPesan('Account not found')
      setIsExist(false)
    }
    if(data){
      console.log(data);
     setIsExist(true)
    }
  }

const ResetPasswords = async (e) => {
e.preventDefault()
setIsSubmit(true)    
setPesan('')
if(!email){
  setPesan('Please fill your email')
  setError(true)
  setIsSubmit(false)
  return
}
console.log(isExist);
fetchData()
 if(isExist !== null){
    SendLink()
    setIsSubmit(false)
 }else{
alert(null)
setIsSubmit(false)
 }
  }

const SendLink = async () => {
 const { data, err } =  await supabase.auth.api.resetPasswordForEmail(email, {
    // redirectTo: 'http://localhost:3000/new-password/',
  })
if(data) {
    setIsSubmit(false)
    console.log(data);
    setError(false)
    setSukses(true)
    setPesan('We succesfully sent link to your email')
}
if(err) {
    console.log(err.mssage);
    setIsSubmit(false)
    setError(true)
    setPesan(err.mssage)
}
}

  return(

<div className='container mt-5 pt-4 mx-5'>
            <div className='columns is-centered '>
<div className='column is-6 box p-0 '>
<div className='banner' style={banner}></div>
<div className='is-flex justify-between align-center p-3'>
<h4 className='is-title is-size-6'>
    Reset your password
</h4>
 <Link to='/register/' className='has-text-primary is-title'>Login</Link>
</div>
<form class="field is-flex is-flex-column is-flex-gap-md p-3" onSubmit={ResetPasswords}>
<input class="input is-large" type="email" name='email' placeholder="Email" onChange={HandlerChange}/>
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
   </div>
       )

}

export default ResetPassword;