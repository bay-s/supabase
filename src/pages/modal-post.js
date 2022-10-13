import React from 'react'
import Loading from './loading';
import { Link } from 'react-router-dom';
import ModalPostImage from './modal-post-image';
import ModalPostInput from './modal-post-input';
import supabase from '../supabase-config';


class ModalPosts extends React.Component{
constructor(props){
    super(props)
    this.state = {
        hide:true,
        isError:false,
        sukses:false,
        pesan:'',
        caption:'',
        post_image:'',
        drop:false,
        loading:false,
        isUpload:false,
        icons:React.createRef(),
        imgArr:[],
        imgUpload:'',
        url:'',
        total_posts:'',
        value:'',
        imgName:'',
        selectOption:['--Select Category--','Anime','Manga','Games','Sports','Technology','Design','Fashion']
    }
}

componentDidMount(){
  window.addEventListener("dragover",function(e){
      e = e || e;
      e.preventDefault();
    },false);
    window.addEventListener("drop",function(e){
      e = e || e;
      e.preventDefault();
    },false);
    window.addEventListener("drop",function(e){
      e = e || e;
      e = e || e;
      e.preventDefault();
    },false);
    window.addEventListener("drop",function(e){
      e = e || e;

      e.preventDefault();
    },false);
  

}

dragItem = (e) => {
  e.preventDefault()
const icon = this.state.icons.current
this.setState({drop:this.state.drop = true})
icon.classList.add('has-text-info')
}

exitDrag = e => {
  e.preventDefault()
  const icon = this.state.icons.current
  icon.classList.remove('has-text-info') 
}

dropItem = ev => {
  ev.preventDefault()
  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    [...ev.dataTransfer.items].forEach((item, i) => {
      // If dropped items aren't files, reject them
      if (item.kind === 'file') {
        const file = item.getAsFile();
        console.log(`… file[${i}].name = ${file.name}`);
        this.setState({
          imgUpload:URL.createObjectURL(file),
          url:file.name
        });
        console.log( URL.createObjectURL(file));
        console.log(this.state.url);
      }
    });
  } else {
    // Use DataTransfer interface to access the file(s)
    [...ev.dataTransfer.files].forEach((file, i) => {
      console.log(`… file[${i}].name = ${file.name}`);
    });
  }
}


selectValue= (e) => {
  const {name,value} = e.target
  console.log(e.target.value);
  this.setState(prev => {
    return{
 value:prev.value = e.target.value
    }

  })

}

handlerChange = (e) => {
const {name,value} = e.target
this.setState(prev => {
  return{
[name]:value
  }
})
}

ImageChange = event => {
console.log(event.target.files);
if (event.target.files && event.target.files[0]) {
  let img = event.target.files[0];
  const randName =  (Math.random() + 1).toString(36).substring(3);
  const imgStr = img.name.split(".")
  this.setState({
    imgUpload: URL.createObjectURL(img),
    url:img,
    imgArr:img,
    imgName:`${randName}.${imgStr[1]}`
  });

}

};


InsertPost = async (imgUrl) => {
  const id = this.props.user.id
  const [data,error] = await supabase
  .from('post')
  .insert([
    {
    post_cat:this.state.value,  
    post_content:this.state.caption,  
    post_image:imgUrl,
    author_uid:id
    }
  ])

  if(error){
console.log(error);
  }
  if(data){
    alert("create post sukses")
console.log(data);
this.setState({loading:false})
  }
}

uploadImage = async e => {
  e.preventDefault()
  if(!this.state.caption || !this.state.value){
    this.setState({
      isError:true,
      pesan:'Input fields required'
    })
    return
  }
  this.setState({loading:true})
  const { data, error} = await supabase.storage
  .from('images')
  .upload(`public/${this.state.imgName}`, this.state.url, {
    cacheControl: '604800',
    upsert: false
  })
  if(error){
      console.log(error);
      this.setState({
        isError:true,
        pesan:error.message,
        loading:false
      })
  }
  if(data){
      console.log(data);
      const imgUrl = data.Key
      this.getURL(imgUrl)
      this.setState({
        isError:false,
        sukses:true,
        isUpload:true,
        pesan:'Create post success'
      })
  }
}

getURL = async (url) => {
const { data,error } = supabase
  .storage
  .from('images')
  .getPublicUrl(`public/${this.state.imgName}`)
  if(data){
    const imgUrl= data.publicURL;
    console.log(imgUrl);
    this.InsertPost(imgUrl) 
  }
  if(error){
    console.log(error);
  }
}
render(){

    const style = {
        height:`${400}px`
    }

    const data = {
      pesan:this.state.pesan,
      sukses:this.state.sukses,
      isError:this.state.isError,
      handlerChange:this.handlerChange,
      imgUpload:this.state.imgUpload,
      selectValue:this.selectValue,
      value:this.state.value,
      selectOption:this.state.selectOption
    }

    return(
        <>
 <div class="modal-background"></div>
<form onSubmit={this.uploadImage} className='m-5 modal-posts'>
          <div class="modal-card h-500px mx-auto">
<header class="modal-card-head">
<p class="modal-card-title has-text-centered is-size-6 is-title">Create new post</p>
<button type='submit' className={this.state.imgUpload === '' ? 'hide' : 'modal-button has-text-info is-tittle mx-3 is-size-6' }>Post</button>
<a href='' class="delete" aria-label="close"></a>
</header>
<section  className={this.state.imgUpload === '' ? "modal-card-body is-flex is-flex-direction-column is-vcentered h-100" : "hide"} draggable onDrop={this.dropItem } onDragOver={this.dragItem} onDragLeave={this.exitDrag } style={style}>
<ModalPostInput ImageChange={this.ImageChange} icons={this.state.icons} />
<div className={this.state.loading ? 'my-auto h-100' : 'hide'} >
<Loading isUpload={this.state.isUpload} />
</div>
</section>
<ModalPostImage data={data} />
</div>
          </form>
        </>
            )
}

}

export default ModalPosts;

