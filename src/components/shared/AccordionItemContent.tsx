import React from 'react'

const AccordionItemContent = ({
  className,
  title,
  value,
}: {
  className?: string
  title: string
  value: string | number | undefined
}) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span>{title}</span>
      <span>{value}</span>
    </div>
  )
}

export default AccordionItemContent
