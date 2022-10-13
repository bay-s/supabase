import React from 'react'
import { Link , Navigate} from 'react-router-dom'
import banners from '../banner.jpg'
import supabase from '../supabase-config'
import LoginForm from './login-form'


class LoginPage extends React.Component{
constructor(){
  super()
  this.state = {
    hide:true,
    load:true,
    password:'',
    email:'',
    error:false,
    pesan:'',
    pesanSukses:'',
    sukses:false,
    disable:false,
    isSubmit:false,
    login:false
  }
}



handlerChange = (e) => {
  const {name,value} = e.target
  this.setState(prev => { return{[name]:value}})
  }

  userLogin = async (e) => {
    e.preventDefault()
    if(!this.state.email || !this.state.password){
      this.setState({
        error:true,
        sukses:false,
        isSubmit:false,
        pesan:"Input field require"
      })
      return
    }
    this.setState({
      error:false,
      isSubmit:true
    })
    
    const email =  this.state.email
    const password = this.state.password
        const { user, session, error } = await supabase.auth.signIn({
        email:email,
        password:password,
      })

      if(error){
        console.log(error);
        this.setState({
          error:true,
          pesan:error.message,
          isSubmit:false,
          sukses:false
        })
      }
      if(session){
        console.log(session);
      }
      if(user){
        console.log(user);
        this.setState({
          error:false,
          isSubmit:false,
          sukses:true,
          pesan:"Login Sukses"
        })
        window.location.href = "/";
      }

  }
  

render(){
      
  const banner =  {
    backgroundImage:`url(${banners})`,
    height:`${200}px`
  }
  
  return(
this.props.isLogin ? <Navigate to="/" replace={true} /> :
<div className='container mt-5 pt-4'>
            <div className='columns is-centered '>
<div className='column is-6 box p-0 '>
<div className='banner' style={banner}></div>
<LoginForm isSubmit={this.state.isSubmit} userLogin={this.userLogin} handlerChange={this.handlerChange}  sukses={this.state.sukses} error={this.state.error} pesan={this.state.pesan} />
<div class="field is-flex justify-between p-3">
   <div className='is-flex is-flex-gap-md'>
   <p className='is-title is-size-7'>Don`t have an Account ?</p>
   <Link to='/register/' className='has-text-primary  is-title is-size-7'>Sign Up</Link>
   </div>
   <Link to='/reset-password/' className='has-text-primary  is-title is-size-7'>Forgout your password ?</Link>
 </div>
</div>
      </div>
            {/* END COLUMNS */}
   </div>
       )
}

}

export default LoginPage;