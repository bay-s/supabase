import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from './register-form';
import RegisterPageLeft from './register-page-left';
import supabase from '../supabase-config';

class RegisterPages extends React.Component{
  constructor(){
    super()
    this.state = {
      hide:true,
      load:true,
      password:'',
      email:'',
      fullname:'',
      username:'',
      error:false,
      pesan:'',
      pesanSukses:'',
      sukses:false,
      disable:false,
      isSubmit:false,
    }
  }


  
  handlerChange = async (e) => {
    const {name,value} = e.target
    this.setState({
      [name]:value
    })
    console.log(value);
  }
  
   RegisterUser = async (e) => {
    e.preventDefault()
    if(!this.state.email || !this.state.password || !this.state.username || !this.state.fullname){
      this.setState({
        error:true,
        pesan:"Input field required"
      })
      return
    }
    this.setState({
      error:false,
      isSubmit:true
    })

    const email =  this.state.email
    const password = this.state.password
        const { user, session, err } = await supabase.auth.signUp({
        email:email,
        password:password
      })

      if(err){
        console.log(err);
        this.setState({
          sukses:false,
          error:true,
          pesan:`Something wrong ${err.message} ${err.code}`,
          isSubmit:false
        })
      }
      if(session){
        console.log(session);
      }
      if(user){
        console.log(user.id);
        this.setState({
          sukses:true,
          error:false,
          pesan:'Register Sukses',
          isSubmit:false
        })
      }
      this.insertDataUser(user.id)
      setTimeout(() => {
        e.target.reset()
      }, 3000);
  }
  

  insertDataUser = async (id) => {
    
    const {data,err} = await supabase 
    .from('users')
    .insert([{
      username:this.state.username,
      fullname:this.state.fullname,
      email:this.state.email,
      avatar:'',
      banner:'',
      uid:id
    }])
    if(err){
      console.log(err);
      this.setState({
        sukses:false,
        error:true,
        pesan:`Something wrong ${err.message} ${err.code}`,
        isSubmit:false
      })
    }
    if(data){
      console.log(data);
      this.setState({
        sukses:true,
        error:false,
        pesan:'Register Sukses',
        isSubmit:false
      })
    }
  }
     render(){

      return(
<section className='container my-fluid'>
<div className='columns is-centered is-multiline is-gapless'>
{/* start col left */}
<div className='column is-5 p-0 box'>
 <RegisterPageLeft pesan={this.state.pesan} error={this.state.error} sukses={this.state.sukses}/>
</div>
 {/* end col left */}
<div className='column is-5 p-0 box'>
<RegisterForm RegisterUser={this.RegisterUser} handlerChange={this.handlerChange} isSubmit={this.state.isSubmit} />
 <div class="field is-flex is-flex-gap-md is-justify-content-center pb-4">
   <p className='is-title'>Already have an Account ?</p>
        <Link to='/login/' className='has-text-info has-text-weight-bold is-title'>Login</Link>
 </div>
   </div>
   {/* END COLUMN RIGHT */}
 </div>
         {/* END COLUMNS */}
        </section>
            )

     }
}

export default RegisterPages;