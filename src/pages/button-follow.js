import React from 'react'
import { Link } from "react-router-dom";
import supabase from '../supabase-config';



class ButtonFollow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        isFollow:false,
        follower_id:[],
        following_id:[]
        }
    }

    componentDidMount(){
        this.getIdFollower()
        this.getIdFollowing()
        }
        
        getIdFollower = async () => {
          const id = this.props.user_login_id
          const { data, error } = await supabase
          .from('follow')
          .select()
          .eq('user_id',this.props.id)
          if(error){
            console.log(`${error} No data`);
          }
          if(data){
            console.log(data);
            data.map(follow => {
              this.setState({follower_id:follow.id})
              console.log(follow);
                if (follow.follower_id === id) {
                    console.log("sama");
                      this.setState({
                        isFollow:true
                      })
                  } else {
                      console.log("salah");
                  }
            })
          }
        }
        
        getIdFollowing = async () => {
          const id = this.props.user.uid
          const { data, error } = await supabase
          .from('following')
          .select()
          .eq('user_id',id)
          if(error){
            console.log(`${error} No data`);
          }
          if(data){
            console.log(data);
            data.map(follow => {
              this.setState({following_id:follow.id})
            })
          }
        }
        

 AddFollow = async (e) => {
    const id = this.props.id;
    const is_follows = e.target.dataset.follow;
    const fid = parseInt(e.target.dataset.id)
    const f_id = parseInt(e.target.dataset.following)

    if (is_follows === id) {
      if (e.target.classList.contains("following")) {
        e.target.textContent = 'Follow'
        console.log("ada FOLLOW");
        e.target.classList.remove('following')
        this.RemoveFollow(id,fid)
        this.RemoveUserFollow(f_id)
      } else {
        console.log("KOSONG");
        e.target.textContent = 'Following'
        e.target.classList.add('following')
        this.UpdateFollow()
      }
    }
  };
  

  UpdateFollow = async () => {
    const id = this.props.data.id
    const { updata, err }= await supabase
    .rpc('increments', { x: 1, row_id: id})
    if(updata){
        alert("Add follow sukes")
        console.log(updata);
      }if(err){
        alert(err)
        console.log(err);
      }
  
    const { data, error } = await supabase
      .from('follow')
      .insert([
        { 
            follower_id:this.props.user_login_id,
            user_id:this.props.id,
            detail:`${this.props.user.username} Has Follow ${this.props.data.username}`
        }
      ])
      if(data){
        alert("Add follow sukes")
        console.log(data);
        this.UpdateUserFollow()
      }if(error){
        console.log(error);
      }
    }
        
    RemoveFollow = async (id,fid) => {
      const { updata, err }= await supabase
      .rpc('decrement', { x: 1, row_id: this.props.data.id})
    if(updata){
        alert("Remove follow sukes")
        console.log(updata);
      }if(err){
       console.log(err);
      }

    const { data, error } = await supabase
    .from('follow')
    .delete()
    .eq('id',fid)
    
    if(data){
        alert("Remove follow sukes")
        console.log(data);
      }if(error){
        console.log(error);
      }
    }

    UpdateUserFollow = async () => {
      const id = this.props.user.id
      const { updata, err }= await supabase
      .rpc('user_increment', { x: 1, row_id: id})
        if(updata){
            alert("Add follow sukes")
            console.log(updata);
          }if(err){
            alert(err)
            console.log(err);
          }
        
          const { data, error } = await supabase
          .from('following')
          .insert([
            { 
                following_id:this.props.id,
                user_id:this.props.user_login_id,
                detail:`${this.props.user.username} Has Follow ${this.props.data.username}`
            }
          ])
          if(data){
            alert("Add follow sukes")
            console.log(data);
          }if(error){
            alert(error)
            console.log(error);
          }
        }
    
        RemoveUserFollow = async (f_id) => {
            const id = this.props.user.id
            const { updata, err }= await supabase
            .rpc('user_decrement ', { x: 1, row_id:id})
            if(updata){
                alert("remove follow sukes")
                console.log(updata);
              }if(err){
                alert(err)
                console.log(err);
              }
            
              const { data, error } = await supabase
              .from('following')
              .delete()
              .eq('id',f_id)
              
              if(data){
                  alert("Remove follow sukes")
                  console.log(data);
                }if(error){
                  console.log(error);
                }
            }
        
    render(){

      const buttonFollow =
      this.state.isFollow ? 
      <button class="button is-info is-radius is-title is-size-7 is-small hvr-curl-top-left following" data-id={this.state.follower_id} data-following={this.state.following_id} data-follow={this.props.id}
      onClick={this.AddFollow}>Following</button>   
      :       <button class="button is-link is-radius  is-title is-size-7 is-small hvr-curl-top-left" data-following={this.state.following_id}  data-id={this.state.follower_id} data-follow={this.props.id}
      onClick={this.AddFollow}>Follow</button>
  
        return(
           buttonFollow
        )
    }
}

export default ButtonFollow;