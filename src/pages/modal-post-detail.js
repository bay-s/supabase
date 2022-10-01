import React, { useState } from 'react'
import { Link} from 'react-router-dom';
import img from '../test.png'
import ModalPostRight from './modal-post-detail-right';




function ModalPostDetail(props){

    return(
<div className='column is-10'>
<div class="modal-card w-100 ">
<div className='columns is-multiline p-0 is-gapless  h-700px'>
{/* START POST LEFT */}
<div className='column is-7 has-background-primary h-100'>
<img src={img} className='w-100 h-100'/>
</div>
{/* END POST LEFT */}
{/* START POST RIGHT */}
<ModalPostRight post={props.post} UserData={props.UserData} />
{/* END POST RIGHT */}
</div>
  </div>
</div>
    )

}

export default ModalPostDetail;


