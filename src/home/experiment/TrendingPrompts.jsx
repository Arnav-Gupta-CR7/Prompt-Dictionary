import { useEffect } from "react"
import { supabase } from "../../lib/supabase.ts"

export default function TrendingPrompts() {
  useEffect(() => {
    async function fetchTrending() {
      const { data, error } = await supabase
        .rpc("get_trending_prompts")

      console.log("RPC get_trending_prompts → data:", data)
      console.log("RPC get_trending_prompts → error:", error)
    }

    fetchTrending()
  }, [])

  return (
    <section>
      <h2>🔥 Trending Prompts</h2>
      <p>Check console for RPC response</p>
    </section>
  )
}
