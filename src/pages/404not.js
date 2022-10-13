import React from 'react'
import { Link } from 'react-router-dom';

function  NotFound (){

        return(
<section class="hero  mt-5 pt-5">
  <div class="hero-body">
    <p class="subtitle text-center">
    <h1 className='is-title is-bold is-italic title is-1'>PAGE NOT FOUND</h1>
  <Link to='/'>  <i class="fa fa-long-arrow-left" aria-hidden="true"></i>BACK TO HOME</Link>
    </p>
  </div>
</section>
        )
}

export default NotFound;

