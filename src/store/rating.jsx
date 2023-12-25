import React from 'react'

export default function Rating({rate,count}) {
  return (
    <>
        .<span className="badge badge-pill bg-warning">{rate} ({count})</span>
    </>
    
  )
}
