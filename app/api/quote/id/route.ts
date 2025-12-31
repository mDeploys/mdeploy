import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
    try {
        // Get the next value from the sequence without incrementing if possible? 
        // Actually, nextval() ALWAYS increments. That's fine for quotes.
        const { data, error } = await supabase.rpc('get_next_quote_id')

        if (error) {
            // Fallback if RPC doesn't exist yet
            const { data: seqData, error: seqError } = await supabase.rpc('execute_sql', {
                sql_query: "SELECT nextval('quotes_quote_number_seq')"
            })

            if (seqError) {
                // Second fallback: Just a timestamp based random for now if DB is not ready
                const tempId = `QT-${Math.floor(Date.now() / 1000).toString().slice(-4)}`
                return NextResponse.json({ quoteId: tempId, pending: true })
            }

            const nextNum = seqData[0].nextval
            const formattedId = `QT-${String(nextNum).padStart(4, '0')}`
            return NextResponse.json({ quoteId: formattedId })
        }

        return NextResponse.json({ quoteId: data })
    } catch (error) {
        console.error("[Quote ID API] Error:", error)
        return NextResponse.json({ quoteId: "QT-XXXX", error: true })
    }
}
