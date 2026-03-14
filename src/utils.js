
let cachedQuestions = null

export async function getQuestions(retries = 3) {
  if (cachedQuestions) return cachedQuestions

  try {
    const res = await fetch("https://opentdb.com/api.php?amount=5")
    if (res.status === 429 && retries > 0) {
      await new Promise(r => setTimeout(r, 1000))
      return getQuestions(retries - 1)
    }
    const data = await res.json()
    cachedQuestions = data.results
    return cachedQuestions
  } catch (err) {
    console.error(err)
    return []
  }
}
