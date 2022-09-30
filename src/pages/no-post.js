import React from 'react'
import nopos from '../no-post.jpeg'

const NoPost = () => {
    return(
<div className='column is-4 is-centered mx-auto'>
<div className='card'>
 <figure className="image is-4by3">
<img src={nopos} />
</figure>
</div>
</div>
    )
}

export default NoPost;