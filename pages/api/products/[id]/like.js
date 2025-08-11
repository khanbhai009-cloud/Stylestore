import { supabase } from '@/lib/supabaseClient'

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'POST') {
    const { data, error } = await supabase
      .from('products')
      .update({ likes: supabase.raw('likes + 1') })
      .eq('id', id)
      .select()
      .single()

    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json(data)
  }

  res.status(405).json({ message: 'Method not allowed' })
}