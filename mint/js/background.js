// const BASE_URL = "https://github.com";
// const STORAGE_PROFILE = "githubProfile";
// const STORAGE_REPOS = "githubRepos";

// let storedGithubProfile;
// let storedRepos = [];

// chrome.omnibox.onInputStarted.addListener(() => {
//   chrome.storage.sync.get([STORAGE_PROFILE, STORAGE_REPOS], (storage) => {
//     if (storage.githubProfile) {
//       storedGithubProfile = storage.githubProfile;

//       if (storage.githubRepos) {
//         storedRepos = storage.githubRepos;
//       }
//     }
//   });
// });

// chrome.omnibox.onInputChanged.addListener((text, suggest) => {
//   if (!text || !text.length) return storedRepos;
//   const filteredRepos = storedRepos.filter((repoName) => {
//     const searchTerm = text.toLowerCase();
//     const doesMatch = repoName.toLowerCase().includes(searchTerm);
//     return doesMatch;
//   });
//   const suggestions = filteredRepos.map((repoName) => ({
//     content: repoName,
//     description: repoName,
//   }));
//   suggest(suggestions);
// });

// chrome.omnibox.onInputEntered.addListener((text) =>
//   chrome.tabs.update({ url: `${BASE_URL}/${storedGithubProfile}/${text}` })
// );
