import React from 'react'
import { Link } from 'react-router-dom'
import ButtonFollow from './button-follow';


const ButtonUser = (props) => {

    return(
 <>
<ButtonFollow id={props.id} user_login_id={props.user_login_id} user={props.user} data={props.data}/>
<Link to={`/send-message/${'test'}`} className='button is-link is-radius  is-title is-size-7 is-small hvr-curl-top-right'>Send Message<i className="fa fa-paper-plane-o  px-2" aria-hidden="true"></i></Link> 
</>
    )
}

export default ButtonUser;