const BASE_URL = "https://github.com";
const STORAGE_PROFILE = "githubProfile";
const STORAGE_REPOS = "githubRepos";

let storedGithubProfile;
let storedRepos = [];

const reposToSuggestions = (repos) => {
  return repos.map((repoName) => ({
    content: repoName,
    description: repoName,
  }));
};

chrome.omnibox.onInputStarted.addListener(() => {
  chrome.storage.sync.get([STORAGE_PROFILE, STORAGE_REPOS], (storage) => {
    if (storage.githubProfile) {
      storedGithubProfile = storage.githubProfile;

      if (storage.githubRepos) {
        storedRepos = storage.githubRepos;
      }
    }
  });
});

chrome.omnibox.onInputChanged.addListener((text, suggest) => {
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
});

chrome.omnibox.onInputEntered.addListener((text) => {
  let githubUrl = `${BASE_URL}/${storedGithubProfile}`;
  if (text) {
    githubUrl += `/${text}`;
  }
  chrome.tabs.update({ url: githubUrl })
})
