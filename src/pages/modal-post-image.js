import React from 'react'
import akun from '../akun.jpg'

function ModalPostImage(props){

    return(
<section className={props.imgUpload !== '' ? "columns is-multiline p-0 m-0 h-100" : "hide"}>
<div className='column is-8 p-0 m-0 image-container '> <img src={props.imgUpload} alt="test" /></div>
 <div className='column  p-3 has-background-white caption'>
  <div className='is-flex is-align-items-center is-flex-gap-lg'>
<figure class="image is-32x32">
  <img src={props.dataUser.avatar === '' ? akun : props.dataUser.avatar} className='is-rounded' />
</figure>
<p className='subtitle is-title is-7'>{props.dataUser.username}</p>
  </div>
  <div class="select is-primary my-2">
<select className='select is-primary my-2' value={props.value} onChange={props.selectValue}>
{props.selectOption.map(value => {
    return <option value={value}>{value}</option>
})}
</select>
</div>
  <div className='field my-1'>
  <textarea class="textarea is-light" name='caption' placeholder="Write caption.." onChange={props.handlerChange}></textarea>
  </div>
<article class={props.isError ? "message is-danger" : 'hide'}>
          <div class="message-body">
         <i> {props.pesan}</i>
          </div>
        </article>
        <article class={props.sukses ? "message is-success" : 'hide'}>
          <div class="message-body">
         <i> {props.pesan}</i>
          </div>
</article>
 </div>
</section>
    )
}

export default ModalPostImage;



