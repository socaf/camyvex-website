import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET - Fetch content
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')
    
    let query = supabase.from('website_content').select('*')
    
    if (section) {
      query = query.eq('section', section)
    }
    
    const { data, error } = await query.order('key')
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Update content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { section, key, value, type = 'text' } = body
    
    if (!section || !key || value === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const { data, error } = await supabase
      .from('website_content')
      .upsert({ section, key, value, type }, { onConflict: 'section,key' })
      .select()
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}