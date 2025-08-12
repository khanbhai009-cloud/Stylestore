import { firebase } from '@/lib/firebase'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await firebase.from('products').select('*').order('created_at', { ascending: false })
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const product = req.body
    const { data, error } = await supabase.from('products').insert([product]).select()
    if (error) return res.status(500).json({ error: error.message })
    return res.status(201).json(data)
  }

  res.status(405).json({ message: 'Method not allowed' })
}
