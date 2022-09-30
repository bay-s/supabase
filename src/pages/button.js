import React from 'react'
import { Link } from 'react-router-dom'

const Button = (props) => {

    return(
    <div class="is-flex is-flex-gap-md">
        <Link class="button is-small is-info is-title is-rounded" to='/register/'>
          <strong>Sign up</strong>
        </Link>
        <Link class="button is-small is-info is-title is-rounded" to='/login/'>
         Sign in
        </Link>
    </div>
    )
}

export default Button