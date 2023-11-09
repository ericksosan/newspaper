import React from 'react'
import { Title } from '../../atoms'

interface ContainerAccountSettingsProps {
  children: React.ReactNode
  sectionTitle: string
}

export const ContainerAccountSettings: React.FC<ContainerAccountSettingsProps> = ({ children, sectionTitle }) => {
  return (
    <div className="max-w-xl mx-auto flex flex-col py-8 xl:pt-16 min-h-screen px-5
      md:px-10 font-montserrat animate-fade animate-duration-300 animate-ease-in">

      <Title className="text-lg md:text-4xl pb-4">{sectionTitle}</Title>

      <div className="p-5 border rounded-md dark:border-slate-700">
        {children}
      </div>
    </div>
  )
}
