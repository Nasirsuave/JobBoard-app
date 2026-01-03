import React from 'react'
import ResumeHeader from './ResumeHeader'
import ResumeBody from './ResumeBody'



export default function ResumePreview() {
  return (
    <article className='h-90 w-120 border shadow-lg rounded-md m-5 '>
      <ResumeHeader />
      <ResumeBody />
    </article>
  )
}
