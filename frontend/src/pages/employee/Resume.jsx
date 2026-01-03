import ResumeManage from '@/components/employee/resume/manage/ResumeManage'
import ResumePreview from '@/components/employee/resume/preview/ResumePreview'
import React from 'react'

export default function Resume() {
  return (
    <div>
      <ResumePreview />
      <ResumeManage />
    </div>
  )
}
