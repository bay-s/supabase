import React from 'react'


const MessageChatLeft = (props) => {
    return(
<div class="answer left">
{/* START AVATAR LEFT */}
<div className='is-flex align-center is-flex-gap-md'>
<div class="image is-32x32 avatar">
<img className="is-rounded" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="User name" />
</div>
<div className='is-flex is-flex-column'>
<p className='is-title is-size-7 p-0'>Alexander Herthic</p>
<span className='is-title is-size-7 p-0'>5 min ago</span>
</div>
</div>
{/* END AVATAR LEFT */}
<div className='is-flex is-flex-column'>
<p className='text is-title is-size-7 '>
Lorem ipsum dolor amet, consectetur adipisicing elit Lorem ipsum dolor amet, consectetur adipisicing elit Lorem ipsum dolor amet, consectetur adiping elit
</p>
</div>
{/* END TEXT */}
 </div> 
    )
}

export default MessageChatLeft;

