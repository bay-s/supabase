import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import { useEffect, useState } from "react"
import supabase from "./supabase-config"
import LoginPage from "./pages/login-pages"
import RegisterPages from "./pages/register-pages"
import Header from "./pages/header"
import Profile from "./pages/profile"
import ModalPosts from "./pages/modal-post"
import EditProfile from "./pages/edit-profile"
import Message from "./pages/message"
import MessageList from "./pages/message-list"


function App() {
  const [users,setUsers] = useState([]);
  const [isLogin,setIsLogin] = useState(false)
  const [open,setOpen] = useState(false)
  const [data,setData] = useState([])

  useEffect(() => {
    const user = supabase.auth.user();
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN') {
        // console.log('SIGNED_IN', session)
        const { data, error } = supabase.auth.setSession(session.refresh_token)
        // console.log(session.refresh_token);
      }
      if (event == 'TOKEN_REFRESHED') {
        // console.log('TOKEN_REFRESHED', session)
        const { data, error } = supabase.auth.setSession(session.refresh_token)
        // console.log(session.refresh_token);
      }
    })
    if(user){
      setIsLogin(true)
      setUsers(user)
      console.log("user logged in");
      console.log(user);
      console.log(isLogin);
    }else{
      setIsLogin(false)
      console.log(isLogin);
      console.log("not login");
    }

  const check =  user? fetchData(user.id) : console.log("kosong");
  },[])

  const openModal = e => {
    e.preventDefault()
    setOpen(!open)
  }

  const fetchData = async (id) => {
    const {data,error} = await supabase
    .from('users')
    .select()
    .eq('uid',id)
    .single()
    if(error){
      console.log(error);
    }
    if(data){
      setData(data)
      console.log(data);
    }
  }


  return (

    <BrowserRouter>
      <Header isLogin={isLogin} user={users} openModal={openModal}/>
      <Routes>
        <Route path="/" element={isLogin ? <Home isLogin={isLogin} data={data}/> : <LoginPage isLogin={isLogin} />} />
        <Route path="/message-list/" element={isLogin ? <MessageList data={data}/> : <LoginPage isLogin={isLogin} />} />
        <Route path="/profile/:id" element={isLogin ? <Profile user={data} /> : <LoginPage isLogin={isLogin} />} />
        <Route path="/edit-profile/" element={isLogin ? <EditProfile data={data}/> : <LoginPage isLogin={isLogin} />} />
        <Route path="/message/:id" element={isLogin ? <Message user={data}/> : <LoginPage isLogin={isLogin} />} />
        <Route path="/register/" element={<RegisterPages />} />
        <Route path="/login/" element={<LoginPage isLogin={isLogin} />} />
      </Routes>

<div className={!open ? 'modal' : 'modal is-active'}>
<ModalPosts id={users.id} dataUser={data}/>
<button class="modal-close is-large" aria-label="close" onClick={openModal }></button>
</div>
    </BrowserRouter>
  );
}

export default App;
