import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET - Fetch gallery images
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('is_active', true)
      .order('order_index')
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST - Add/Update gallery image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, title, before_image_url, after_image_url, order_index = 0 } = body
    
    if (!title || !before_image_url || !after_image_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    let data, error
    
    if (id) {
      // Update existing
      ({ data, error } = await supabase
        .from('gallery_images')
        .update({ title, before_image_url, after_image_url, order_index })
        .eq('id', id)
        .select())
    } else {
      // Create new
      ({ data, error } = await supabase
        .from('gallery_images')
        .insert({ title, before_image_url, after_image_url, order_index })
        .select())
    }
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE - Remove gallery image
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Missing image ID' }, { status: 400 })
    }
    
    const { error } = await supabase
      .from('gallery_images')
      .update({ is_active: false })
      .eq('id', id)
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}