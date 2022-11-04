import React from 'react'
import supabase from '../supabase-config'


class Bookmarked extends React.Component{
constructor(props){
super(props)
this.state = {
    likes_id:[],
    isLikes:false,
}
}


componentDidMount(){
this.getIdLikes()
console.log(this.state.likes_id);
}

  
getIdLikes = async () => {
  const id = this.props.user.uid
  const { data, error } = await supabase.from('bookmark')
  .select()
  .eq('post_id',this.props.post.id)
  if(error){
    console.log(`${error} No data`);
  }
  if(data){
    console.log(data);
    data.map(likes => {
      console.log(likes);
      this.setState({likes_id:likes.id})
      console.log(likes.id);
        if (likes.mark_id === id) {
            console.log("sama");
              this.setState({
                  isLikes:true
              })
          } else {
              console.log("salah");
              
          }
    })
  }
}

addLikes = async (e) => {
    e.preventDefault()
    const id = this.props.post.id
    const lid = parseInt(e.target.dataset.likes) 
    
    if(parseFloat(e.target.dataset.id) === id){
      if(e.target.classList.contains('marked')){
        console.log("ada like");
        e.target.classList.remove('marked')
        this.RemoveLikes(id,lid)
        }else{
         console.log("tidakada like");
         e.target.classList.add('marked')
        this.UpdateLikes(id)
        }
      }
}

UpdateLikes = async (id) => {
const { data, error } = await supabase
  .from('bookmark')
  .insert([
    { 
        mark_id: this.props.user.uid,
        post_id:id
    }
  ])
  if(data){
    alert("Add likes sukes")
    console.log(data);
  }if(error){
    alert(error)
    console.log(error);
  }
}

RemoveLikes = async (id,lid) => {

const { data, error } = await supabase
.from('bookmark')
.delete()
.eq('id',lid)

if(data){
    alert("Remove likes sukes")
    console.log(data);
  }if(error){
    console.log(error);
  }
}
render(){

    const is_marked = this.state.isLikes ? <i className="fa fa-bookmark is-size-5 is-clickable marked"  data-likes={this.state.likes_id} data-id={this.props.post.id} onClick={this.addLikes}></i>
    : <i className="fa fa-bookmark-o  is-size-5 is-clickable" data-likes={this.state.likes_id} data-id={this.props.post.id} onClick={this.addLikes}></i>
    
    return(
is_marked
    )
}

}

export default Bookmarked;