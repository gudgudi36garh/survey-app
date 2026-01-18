export default {
  async fetch(request, env) {
    if (request.method === "POST") {
      const data = await request.json()
      await env.BUCKET.put(
        `submission-${Date.now()}.json`,
        JSON.stringify(data)
      )
      return new Response("Saved")
    }
    return new Response("OK")
  }
}
