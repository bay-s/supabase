import React, { useRef } from 'react'
import { Link } from 'react-router-dom';
import img from '../akun.jpg'
import AnimasiEllipsis from './animasi-ellips';

class DisplayComment extends React.Component{
constructor(){
    super()
    this.state = {
     comment:[],
     total_comments:null,
     commentTxt:'',
     open:false,
     view:true,
     openReply:false,
     comment_id:'',
     comment_reply_id:'',
     reply:[],
     reply_id:'',
     comment_owner:'',
     comment_user_id:'',
     submit:true,
     isLoading:true,
     month:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
     replyRef:React.createRef()
    }
}

componentDidMount(){

}

displayReply = e => {
e.preventDefault()
this.setState({view:!this.state.view})
const index = e.target.dataset.index
const ref = e.target.parentElement.parentElement.firstChild.nextElementSibling
ref.classList.toggle('hide')
}
render(){

const commentCard = Array.isArray(this.state.comment.docs) ? this.state.comment.docs.map((com,index) => {

return data.post_id === this.props.post_id ? <CommentCard replyRef={this.state.replyRef} openReply={this.props.openReply} displayReply={this.displayReply} view={this.state.view}  data={data} date={date} post_id={CommentCard} index={index}/> : ""
}) : ""

return(
// this.state.isLoading ?<AnimasiEllipsis /> :  commentCard 
""
)

}

}


export default DisplayComment;
