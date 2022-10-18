import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'
import supabase from '../supabase-config'


const ButtonUserLogin = () => {
    const {value} = useContext(AppContext);
     const uid = value.data.uid

    const deleteAccount = async (e) => {
    e.preventDefault()
    if(window.confirm("Are you sure want to delete this Account ?")){
        const { data, error } = await  supabase.auth.api.deleteUser(uid)
        if(data) console.log(data);
        if(error) console.log(error.message);
    }
    }
    return(
<div className='button-user is-flex is-flex-column is-flex-gap-sm'>
<Link to={`/edit-profile/`} class="button is-radius has-background-primary-light has-text-primary hvr-curl-top-left ">Edit Profile</Link>
{/* <button class="button is-radius has-background-danger-light has-text-danger hvr-curl-top-right" >Delete Account</button> */}
 </div>
    )
}

export default ButtonUserLogin;