import React from 'react'
import loding from './loding.gif'
const Spinner = () => {
  return (
    <div className='text-center'>
      <img src={loding} width="70" height="70" alt="search" />
    </div>
  )
}
export default Spinner
