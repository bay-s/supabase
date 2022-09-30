import React from 'react'

function LoginForm(props){

    return(
        <form className=' is-flex is-flex-direction-column is-flex-gap-md p-3' onSubmit={props.userLogin}>
        <p class="modal-card-title py-3 is-title">Login</p>
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
    <div class="field ">
    <p class="control has-icons-left">
    <input class="input is-large" type="password" name='password' placeholder="Password" onChange={props.handlerChange}/>
    <span class="icon is-small is-left">
    <i class="fa fa-lock"></i>
    </span>
    </p>
    </div>
    
    <article class={props.error ? "message is-danger" : 'hide'}>
    <div class="message-body">
    <i> {props.pesan}</i>
    </div>
    </article>
    <article class={props.sukses ? "message is-success" : 'hide'}>
    <div class="message-body">
    <i> {props.pesan}</i>
    </div>
    </article>
    
    <div class="field">
    <p class="control ">
    
    {props.isSubmit ? <button class="button is-primary is-loading is-fullwidth is-title " disabled>
    Login
    </button>: <button type='submit' class="button is-primary is-fullwidth is-title">
    Login
    </button>}
    </p>
    </div>
    </form>
    )
}

export default LoginForm