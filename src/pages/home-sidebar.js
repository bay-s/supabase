import React from 'react'
import HomeSidebarPopular from './home-sidebar-popular';
import HomeSidebarPost from './home-sidebar-post';
import HomeProfile from './home-sidebar-profile';



const HomeSidebar = (props) => {

    return(
// START CARD CONTAINER
<div class="is-flex is-flex-column is-flex-gap-lg sidebar">
<HomeProfile data={props.data} />
{/* END PROFILE CARD */}
{/* START RECENT POST CARD */}
<HomeSidebarPost />
{/* END RECENT POST CARD */}
<HomeSidebarPopular />
{/* END CARD 2 */}
              </div>
// END CARD CONTAINER 
    )
}

export default HomeSidebar;