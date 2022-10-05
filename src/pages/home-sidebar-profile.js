import React from 'react'
import banners from '../banner.jpg'
import akun from '../akun.jpg'
import { Link } from 'react-router-dom'



const HomeProfile = (props) => {


    const banner =  {
        backgroundImage:`url(${banners})`,
        height:`${120}px`
      }
    return(
 <div className="card">
        <header className="banner" style={banner}></header>
        <div className="card-content p-2">
          <header className="is-flex align-center justify-between">
            <div className="is-flex align-center">
              <figure className="image is-48x48 avatar">
                <img className="is-rounded" src={props.data.avatar === '' ? akun : props.data.avatar} />
              </figure>
              <p className="card-header-title is-size-7 is-bold">
               <Link to={`/profile/${props.data.uid}`} className='has-text-dark'>{props.data.fullname}</Link>
              </p>
            </div>
            <i className="fa fa-ellipsis-h is-clickable"></i>
          </header>
          <div className="content p-0 p-2 ">
            <nav
              className="is-flex align-center justify-center is-flex-gap-xl my-2"
            >
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Post</p>
                  <p className="title is-5 is-bold">{props.data.total_post < 1 ? "0" : props.data.total_post}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Following</p>
                  <p className="title is-5 is-bold">{props.data.total_following < 1 ? "0" : props.data.total_following}</p>
                </div>
              </div>
              <div className="level-item has-text-centered">
                <div>
                  <p className="heading">Followers</p>
                  <p className="title is-5 is-bold">{props.data.total_follower < 1 ? "0" : props.data.total_follower}</p>
                </div>
              </div>
            </nav>
          </div>
        </div>
 </div>
    )
}

export default HomeProfile;