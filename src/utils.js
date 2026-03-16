


export async function getQuestions(retries = 3) {
  try {
    const res = await fetch("https://opentdb.com/api.php?amount=5")
    if (res.status === 429 && retries > 0) {
      await new Promise(r => setTimeout(r, 1000))
      return getQuestions(retries - 1)
    }
    const data = await res.json()
    return data.results
  } catch (err) {
    console.error(err)
    return []
  }
}
