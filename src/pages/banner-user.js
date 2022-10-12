import React from 'react'
import banners from '../banner2.jpg'


const BannerUser = (props) => {

    let banner;
    if(props.data.banner !== null){
        banner = {
            backgroundImage:`url(${props.data.banner})`,
            height:`${200}px`
        }
    }else{
        banner = {
            backgroundImage:`url(${banners})`,
            height:`${200}px`
        }
    }
    
        
    return(
<div class="banner" style={banner}></div>
    )
}

export default BannerUser;