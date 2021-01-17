import React from 'react'
import { rubles } from 'rubles'



const AvrPrint = ({current}) => {
    const text = rubles(current.total)
  return (
    <div>
      AVR
    </div>
  )
}

export default AvrPrint
