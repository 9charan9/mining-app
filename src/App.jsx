import React, { useEffect, useState } from 'react'
import { supabase } from './supabase'

export default function App() {
  const [mines, setMines] = useState([])
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [output, setOutput] = useState("")

  useEffect(() => {
    fetchMines()
  }, [])

  async function fetchMines() {
    const { data } = await supabase.from('mines').select('*')
    setMines(data || [])
  }

  async function addMine() {
    await supabase.from('mines').insert([
      { name, location, output }
    ])
    setName("")
    setLocation("")
    setOutput("")
    fetchMines()
  }

  async function deleteMine(id) {
    await supabase.from('mines').delete().eq('id', id)
    fetchMines()
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Mining Management App</h1>

      <div>
        <input placeholder="Mine Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <input placeholder="Daily Output (tons)" value={output} onChange={e => setOutput(e.target.value)} />
        <button onClick={addMine}>Add Mine</button>
      </div>

      <h2>Mine List</h2>
      <ul>
        {mines.map(mine => (
          <li key={mine.id}>
            {mine.name} - {mine.location} - {mine.output} tons
            <button onClick={() => deleteMine(mine.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
