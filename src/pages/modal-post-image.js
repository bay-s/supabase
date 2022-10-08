import React ,{ useContext} from 'react'
import akun from '../akun.jpg'
import { AppContext } from '../App'

function ModalPostImage(props){
     const {value} = useContext(AppContext)
    return(
<section className={props.data.imgUpload !== '' ? "modal-image is-flex is-mobile p-0 m-0 h-100" : "hide"}>
<div className='column is-8 p-0 m-0 image-container'> <img src={props.data.imgUpload} alt="test" /></div>
 <div className='column  p-3 has-background-white caption'>
  <div className='is-flex is-align-items-center is-flex-gap-lg'>
<figure class="image is-32x32">
  <img src={value.data.avatar == null || '' ? akun : value.data.avatar} className='is-rounded' />
</figure>
<p className='subtitle is-title is-7'>{value.data.username}</p>
  </div>
  <div class="select is-primary my-2 w-100">
<select className='select is-primary my-2 w-100' value={props.data.value} onChange={props.data.selectValue}>
{props.data.selectOption.map(value => {
    return <option value={value}>{value}</option>
})}
</select>
</div>
  <div className='field my-1'>
  <input class="input is-light" name='caption' type="text" placeholder="Write caption.." onChange={props.data.handlerChange}/>
  </div>
<article class={props.data.isError ? "message is-danger" : 'hide'}>
          <div class="message-body">
         <i> {props.data.pesan}</i>
          </div>
        </article>
        <article class={props.data.sukses ? "message is-success" : 'hide'}>
          <div class="message-body">
         <i> {props.data.pesan}</i>
          </div>
</article>
 </div>
</section>
    )
}

export default ModalPostImage;



