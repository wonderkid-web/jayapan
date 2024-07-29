import React, { HTMLProps } from 'react'

function Loader({style = ""}:{style:HTMLProps<HTMLElement>["className"]}) {
  return <span className={`loader ${style}`}></span>

}


export default Loader