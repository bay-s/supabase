import React from  'react'


const HomeSidebarPopular = (props) => {


    return(
<div className="card">
        <div className="card-content p-2">
          <h3 className="is-title is-bold">Popular Post</h3>
          <hr className="navbar-divider" />
          <ul className="is-flex is-flex-column align-start my-3 p-1">
            <li className="is-flex is-flex-column align-start">
              <a href="#" className="has-text-weight-semibold has-text-dark">#SomePost</a>
              <span className="has-text-grey-light is-size-7">250 likes</span>
            </li>
            <hr className="navbar-divider w-100" />
            <li className="is-flex is-flex-column align-start">
              <a href="#" className="has-text-weight-semibold has-text-dark">#SomePost</a>
              <span className="has-text-grey-light is-size-7">250 likes</span>
            </li>
            <hr className="navbar-divider w-100" />
            <li className="is-flex is-flex-column align-start">
              <a href="#" className="has-text-weight-semibold has-text-dark">#SomePost</a>
              <span className="has-text-grey-light is-size-7">250 likes</span>
            </li>
            <hr className="navbar-divider w-100" />
            <li className="is-flex is-flex-column align-start">
              <a href="#" className="has-text-weight-semibold has-text-dark">#SomePost</a>
              <span className="has-text-grey-light is-size-7">250 likes</span>
            </li>
            <hr className="navbar-divider w-100" />
            <li className="is-flex is-flex-column align-start">
              <a href="#" className="has-text-weight-semibold has-text-dark">#SomePost</a>
              <span className="has-text-grey-light has-text-weight-bold is-size-7">250 likes</span>
            </li>
            <hr className="navbar-divider w-100" />
          </ul>
        </div>
</div>
    )
}

export default HomeSidebarPopular;