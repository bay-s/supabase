import React from 'react'


const HomeSidebarPost = (props) => {

    return(
<div className="card">
        <h3 className="is-bold is-title py-2 px-2">Recent Post</h3>
        <div className="is-flex is-gapless">
            <div className="column is-radius is-one-third">     
               <figure className="image is-4by3  is-radius">
              <img
                src="https://bulma.io/images/placeholders/1280x960.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div className="column is-radius is-one-third">  
      <figure className="image is-4by3">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"
            alt="Placeholder image"
          />
        </figure>
    </div>
    <div className="column is-radius is-one-third">  
      <figure className="image is-4by3">
          <img
            src="https://bulma.io/images/placeholders/1280x960.png"

          />
        </figure>
    </div>
               </div>   
    </div>
    )
}

export default HomeSidebarPost ;