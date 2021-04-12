const STORAGE_PROFILE = "githubProfile";
const STORAGE_REPOS = "githubRepos";
const SyncStorage = window.chrome.storage.sync;

function chromeGetProfile() {
  return new Promise((resolve) => {
    SyncStorage.get(STORAGE_PROFILE, (storage) => {
      resolve(storage.githubProfile);
    });
  });
}

function chromeGetRepos() {
  return new Promise((resolve) => {
    SyncStorage.get(STORAGE_REPOS, (storage) => {
      resolve(storage.githubRepos);
    });
  });
}

function chromeSetProfile(profileName) {
  return new Promise((resolve) => {
    SyncStorage.set({ [STORAGE_PROFILE]: profileName }, () => {
      resolve();
    });
  });
}

function chromeSetRepos(repos) {
  return new Promise((resolve) => {
    SyncStorage.set({ [STORAGE_REPOS]: repos }, () => {
      resolve();
    });
  });
}

function chromeResetAll() {
  return new Promise((resolve) => {
    const resetRepos = chromeSetRepos([]);
    const resetProfile = chromeSetProfile("");
    Promise.all([resetRepos, resetProfile]).then(() => resolve());
  });
}
