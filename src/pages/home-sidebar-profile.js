import React,{useContext} from 'react'
import banners from '../banner.jpg'
import akun from '../akun.jpg'
import { Link } from 'react-router-dom'
import { AppContext } from '../App'



const HomeProfile = (props) => {
    const {value} = useContext(AppContext)

    let banner;
    if(value.data.banner !== null){
      banner = {
          backgroundImage:`url(${value.data.banner})`,
          height:`${120}px`
      }
  }else{
      banner = {
          backgroundImage:`url(${banners})`,
          height:`${120}px`
      }
  }
  
    return(
 <div className="card">
        <header className="banner" style={banner}></header>
        <div className="card-content p-2">
          <header className="is-flex align-center justify-between">
              <figure className="image is-48x48 avatar">
                <img className="is-rounded" src={value.data.avatar == null || '' ? akun : value.data.avatar} />
              </figure>
              <p className="card-header-title is-size-7 is-bold">
               <Link to={`/profile/${value.data.uid}`} className='has-text-dark'>{value.data.fullname}</Link>
              </p>
          </header>
          <div className="content p-0 p-2 ">
            <nav
              className="is-flex align-center justify-evenly is-flex-gap-xl my-2 sidebar-text"
            >
            <div className="is-flex is-flex-column align-center ">
                  <p className="is-size-7 is-title ">Post</p>
                  <p className="title is-6 is-bold">{value.data.total_post < 1 ? "0" : value.data.total_post}</p>
             </div>
              <div className="is-flex is-flex-column align-center">
                  <p className="is-size-7 is-title">Following</p>
                  <p className="title is-6 is-bold">{value.data.total_following < 1 ? "0" : value.data.total_following}</p>
                </div>
              <div className="is-flex is-flex-column align-center">
              <p className="is-size-7 is-title">Followers</p>
                  <p className="title is-6 is-bold">{value.data.total_follower < 1 ? "0" : value.data.total_follower}</p>
              </div>
            </nav>
          </div>
        </div>
 </div>
    )
}

export default HomeProfile;