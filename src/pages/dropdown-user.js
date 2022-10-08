import React from 'react'
import supabase from '../supabase-config'
import Avatar from './avatar'
import NoResult from './no-result'


class DropdownUser extends React.Component {
constructor(){
    super()
    this.state = {
        dataSearch:[]
    }
}

componentDidMount(){
    this.SearchUser(this.props.search) 
}
componentDidUpdate(){
    this.SearchUser(this.props.search) 
}
 SearchUser = async (value) =>{
    const { data, error } = await supabase
    .from('users')
    .select()
    .ilike('username', `%${value}%`)
    if(data){
      this.setState({DataSearch:data})
      console.log(data);
    }if(error){
      console.log(`404 not found ${error.message}`);
    }
   }
  
    render(){

        return(
            this.state.dataSearch.length < 1 ? <NoResult /> : 
            this.state.dataSearch.map(user => {
              return <Avatar id={user.uid}/>
             })
    
)
    }
}

export default DropdownUser;