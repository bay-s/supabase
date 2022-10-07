import React, { useState } from 'react'
import { Link} from 'react-router-dom';
import img from '../test.png'
import ModalPostRight from './modal-post-detail-right';




function ModalPostDetail(props){

    return(
<div className='column is-10 mx-auto is-centered'>
<div class="modal-card w-100 mx-auto">
<div className='columns is-multiline p-0 is-gapless  h-700px'>
{/* START POST LEFT */}
<div className='column is-7 h-100'>
<img src={props.post.post_image} className='w-100 h-100'/>
</div>
{/* END POST LEFT */}
{/* START POST RIGHT */}
<ModalPostRight post={props.post} user={props.user} UserData={props.UserData} />
{/* END POST RIGHT */}
</div>
  </div>
</div>
    )

}

export default ModalPostDetail;


