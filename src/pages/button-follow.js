import React from 'react'
import { Link } from "react-router-dom";
import supabase from '../supabase-config';



class ButtonFollow extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        isFollow:false,
        follower_id:[],
        total_follower:this.props.data.total_follower,
        total_following:this.props.user.total_following
        }
    }

    componentDidMount(){
        this.getIdFollower()
        console.log(this.state.follower_id);
        }
        
        getIdFollower = async () => {
          const id = this.props.user_login_id
          const { data, error } = await supabase
          .from('follow')
          .select()
          if(error){
            console.log(`${error} No data`);
          }
          if(data){
            console.log(data);
            data.map(follow => {
                if (follow.follower_id === id) {
                    console.log("sama");
                      this.setState({
                        follower_id:follow.follower_id,
                        isFollow:true
                      })
                  } else {
                      console.log("salah");
                  }
            })
          }
        }
        

 AddFollow = async (e) => {
    const id = this.props.id;
    const is_follows = e.target.dataset.follow;
console.log(this.state. total_following);
console.log(this.props.user.total_following);
    if (is_follows === id) {
      if (e.target.classList.contains("following")) {
        e.target.textContent = 'Follow'
        console.log("ada FOLLOW");
        e.target.classList.remove('Following')
        await this.RemoveFollow(id)
      } else {
        console.log("KOSONG");
        e.target.textContent = 'Following'
        e.target.classList.add('Following')
        await this.UpdateFollow(id)
 
      }
    }
  };
  

  UpdateFollow = async (id) => {
    const { updata, err } = await supabase.from('users')
    .update({ total_follower:this.props.data.total_follower + 1})
    .eq('uid',this.props.id)
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
            user_id:this.props.id
        }
      ])
      if(data){
        alert("Add follow sukes")
        this.UpdateUserFollow()
        console.log(data);
      }if(error){
        alert(error)
        console.log(error);
      }
    }
        
    RemoveFollow = async (id) => {
    const { updata, err } = await supabase.from('users')
    .update({ total_follower:this.props.data.total_follower - 1})
    .eq('uid',id)
    if(updata){
        alert("Remove follow sukes")
        this.RemoveUserFollow()
        console.log(updata);
      }if(err){
       console.log(err);
      }

    const { data, error } = await supabase
    .from('follow')
    .delete()
    .eq('follower_id',this.props.user_login_id)
    
    if(data){
        alert("Remove follow sukes")
        console.log(data);
      }if(error){
        console.log(error);
      }
    }

    UpdateUserFollow = async () => {
        const id = this.props.user_login_id
        const { updata, err } = await supabase.from('users')
        .update({ total_following:this.props.user.total_following + 1})
        .eq('uid',id)
        if(updata){
            alert("Add follow sukes")
            console.log(updata);
          }if(err){
            alert(err)
            console.log(err);
          }
        
        }
    
        RemoveUserFollow = async () => {
            const id = this.props.user_login_id
            const { updata, err } = await supabase.from('users')
            .update({ total_following:this.props.user.total_following - 1})
            .eq('uid',id)
            if(updata){
                alert("remove follow sukes")
                console.log(updata);
              }if(err){
                alert(err)
                console.log(err);
              }
            
            }
        
    render(){

      const buttonFollow =
      this.state.isFollow ? 
      <button class="button is-link is-radius is-title is-size-7 is-small hvr-curl-top-left following" data-follow={this.props.id}
      onClick={this.AddFollow}>Following</button>   
      :       <button class="button is-link is-radius  is-title is-size-7 is-small hvr-curl-top-left" data-follow={this.props.id}
      onClick={this.AddFollow}>Follow</button>
  
        return(
           buttonFollow
        )
    }
}

export default ButtonFollow;