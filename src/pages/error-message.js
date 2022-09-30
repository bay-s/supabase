import React from 'react'


const ErrorMessage = (props) => {

    return(
        <>
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
        </>
    )
}

export default  ErrorMessage ;