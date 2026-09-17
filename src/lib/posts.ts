import { supabase } from './supabase'

export async function testPostsConnection() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')

  if (error) {
    console.error('Erro ao acessar posts:', error)
    return
  }

  console.log('Conexão com posts funcionando:', data)
}