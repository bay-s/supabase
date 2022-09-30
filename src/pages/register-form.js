import React from 'react'


const RegisterForm = (props) => {

    return(
  <form className=' is-flex is-flex-direction-column is-flex-gap-md p-5' onSubmit={props.RegisterUser}>
        <p class="mb-4 py-4  has-text-info is-size-3 main-title text-center">Register</p>

        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input class="input is-large" type="text" name='username' placeholder="Username"  onChange={props.handlerChange}/>
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-check"></i>
            </span>
          </div>
        </div>
        {/* END USERNAME FIELD */}
        <div class="field">
          <div class="control has-icons-left has-icons-right">
            <input class="input is-large" type="text" name='fullname' placeholder="Full name" onChange={props.handlerChange}/>
            <span class="icon is-small is-left">
              <i class="fa fa-user"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-check"></i>
            </span>
          </div>
        </div>
          {/* END FULLNAME FIELD */}    

        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input class="input is-large" type="email" name='email' placeholder="Email" onChange={props.handlerChange}/>
            <span class="icon is-small is-left">
              <i class="fa fa-envelope"></i>
            </span>
            <span class="icon is-small is-right">
              <i class="fa fa-check"></i>
            </span>
          </p>
        </div>
          {/* END EMAIL FIELD */}    
        <div class="field ">
          <p class="control has-icons-left">
            <input class="input is-large" type="password" name='password' placeholder="Password" onChange={props.handlerChange}/>
            <span class="icon is-small is-left">
              <i class="fa fa-lock"></i>
            </span>
          </p>
        </div>
            {/* END PASSWORD FIELD */}  

        <div class="field">
          <p class="control">
        {props.isSubmit ? <button class="button is-link is-loading is-title is-fullwidth" disabled>
             Register </button> : <button type='submit' class="button is-link is-title is-fullwidth">
             Register
            </button>}
          </p>
        
        </div>
</form>
    )
}

export default RegisterForm 