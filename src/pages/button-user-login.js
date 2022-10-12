import React from 'react'
import { Link } from 'react-router-dom'

const ButtonUserLogin = () => {

    return(
<div className='button-user'>
<Link to={`/edit-profile/`} class="button is-radius has-background-primary-light has-text-primary hvr-curl-top-left ">Edit Profile</Link>
<button class="button is-radius has-background-danger-light has-text-danger hvr-curl-top-right">Delete Account</button>
 </div>
    )
}

export default ButtonUserLogin;