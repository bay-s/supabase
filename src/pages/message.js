import React from 'react'
import akun from '../akun.jpg'
import CommentInput from './comment-input'
import MessageChatLeft from './message-chat-left'
import MessageChatRight from './message-chat-right'



class Message extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }

    render(){
      const height = {
        height:`${350}px`
      }
        return(
        <div className='column is-8 is-centered mx-auto p-0 my-5 pt-2'>
            <div className='container'>
              <div className='columns'>
<div className='column is-one-third p-0'>
{/* START LEFT COL */}
<div className='card'>
<header class="card-header">
    <p class="card-header-title">
      User List
    </p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fa fa-plus" aria-hidden="true"></i>
      </span>
    </button>
</header>
<div className='is-flex is-flex-column p-2'>
{/* START USER COL */}
<div className='is-flex justify-between align-center'>
<div className='is-flex align-center is-flex-gap-sm'>
<figure className="image is-48x48 avatar">
 <img className="is-rounded" src={akun} />
</figure>
 <a href='#' className='has-text-dark is-size-6 is-title'>Eren yeager</a>     
</div>
<span class="tag is-info"><i class="fa fa-ellipsis-h" aria-hidden="true"></i></span>
</div>
{/* END USER COL */}
</div>
{/* END USER LIST */}
</div>
{/* END LEFT COL INNER */}
                </div>
                {/* END LEFT COL */}
<div className='column p-0'>
{/* START CARD */}
<div className='card'>
<header class="card-header align-center is-flex-gap-md px-2">
<figure className="image is-48x48 avatar">
 <img className="is-rounded" src={akun} />
</figure>
 <a href='#' className='has-text-dark is-size-6 is-title'>Eren yeager</a>  
</header>
<div className='p-3 is-flex is-flex-column is-flex-gap-lg chat-box' style={height}>
<MessageChatLeft />
<MessageChatRight />
</div>
{/* END MESSAGE */}

</div>
{/* END CARD */}
 </div>
                {/* END COL RIGHT */}
              </div>
              {/* END COLUMNS */}
   </div>
   {/* END CONTAINER */}
</div>
        )
    }
}

export default Message;