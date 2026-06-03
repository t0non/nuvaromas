import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('orders')
      .select('payment_status')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`[ORDER STATUS API] Error fetching status for order ${id}:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ status: data.payment_status });
  } catch (error: any) {
    console.error('[ORDER STATUS API] Server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
