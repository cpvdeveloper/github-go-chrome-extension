const BASE_URL = "https://github.com";
const STORAGE_PROFILE = "githubProfile";
const STORAGE_REPOS = "githubRepos";

const reposToSuggestions = (repos) => {
  return repos.map((repoName) => ({
    content: repoName,
    description: repoName,
  }));
};

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
  chrome.storage.sync.get([STORAGE_REPOS], (storage) => {
    const storedRepos = storage[STORAGE_REPOS];
    if (!text || text.length === 0) {
      const allSuggestions = reposToSuggestions(storedRepos);
      return suggest(allSuggestions);
    }
    const filteredRepos = storedRepos.filter((repoName) => {
      const searchTerm = text.toLowerCase();
      const doesMatch = repoName.toLowerCase().includes(searchTerm);
      return doesMatch;
    });
    const suggestions = reposToSuggestions(filteredRepos);
    return suggest(suggestions);
  })
});

chrome.omnibox.onInputEntered.addListener((text) => {
  chrome.storage.sync.get([STORAGE_PROFILE], (storage) => {
    const storedGithubProfile = storage[STORAGE_PROFILE];
    let githubUrl = `${BASE_URL}/${storedGithubProfile}`;
    if (text) {
      githubUrl += `/${text}`;
    }
    chrome.tabs.update({ url: githubUrl })
  })
})
