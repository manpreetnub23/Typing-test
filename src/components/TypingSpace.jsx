import React from 'react'
import paragraphsData from '../assets/paragraphs.json'

const TypingSpace = () => {
    
  return (
    <div className=''>
        {paragraphsData.paragraphs.map(paragraph => (
        <p key={paragraph.id}>{paragraph.text}</p>
      ))}
    </div>
  )
}

export default TypingSpace
