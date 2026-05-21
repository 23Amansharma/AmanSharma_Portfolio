import { useState, useEffect } from 'react'

export default function VisitorCounter() {
  const [count, setCount] = useState(null)

  useEffect(() => {
    const visited = sessionStorage.getItem('visited')
    const method = visited ? 'GET' : 'POST'

    fetch('/api/visitors', { method })
      .then(r => r.json())
      .then(({ count }) => {
        setCount(count)
        if (!visited) sessionStorage.setItem('visited', '1')
      })
      .catch(console.error)
  }, [])

  if (count === null) return null

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', opacity: 0.7 }}>
      <span style={{
        width: '8px', height: '8px', borderRadius: '50%',
        background: '#4ade80', display: 'inline-block'
      }} />
      <span>{count.toLocaleString()} visitors</span>
    </div>
  )
}