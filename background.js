const BASE_URL = 'https://github.com' 

let storedGithubProfile
let storedRepos = []

chrome.omnibox.onInputStarted.addListener(
  () => {
    chrome.storage.sync.get(['githubProfile', 'githubRepos'], storage => {
      if (storage.githubProfile) {
        storedGithubProfile = storage.githubProfile
        
        if (storage.githubRepos) {
          storedRepos = storage.githubRepos
        }
      }
    })
  }
)

chrome.omnibox.onInputChanged.addListener(
  (text, suggest) => {
    const repos = text.length ? storedRepos.filter(repo => repo.includes(text)) : storedRepos
    const suggestions = repos.map(repo => ({
      content: repo, description: repo
    }))
    suggest(suggestions)
  }
)

chrome.omnibox.onInputEntered.addListener(
  text => chrome.tabs.update({ url: `${BASE_URL}/${storedGithubProfile}/${text}` })
)
