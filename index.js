/**
 * Updating a GitHub profile.
 */
function updateGithubProfile() {
  const profileInput = document.getElementById('profile-update-input')
  const profileName = profileInput.value
  if (profileName.length) {
    chrome.storage.sync.set({ githubProfile: profileName }, () => {
      profileInput.value = ''
      setGithubProfile(profileName)
      toggleDisplay('repos-container', 'block')
    })
  }
}

function setGithubProfile(profileName) {
  document.querySelector('.github-profile').innerHTML = profileName
}

/**
 * Repo actions and display.
 */

function addNewRepo() {
  const newRepoInput = document.getElementById('repo-add-input')
  const repoName = newRepoInput.value
  if (repoName.length) {
    chrome.storage.sync.get('githubRepos', storage => {
      let newGithubRepos
      if (storage.githubRepos) {
        newGithubRepos = [...storage.githubRepos, repoName]
      } else {
        newGithubRepos = [repoName]
      }
      chrome.storage.sync.set({ githubRepos: newGithubRepos }, () => {
        const el = document.querySelector('.repo-list')
        el.appendChild(generateListItem(repoName))
        newRepoInput.value = ''
      })
    })
  }
}

function renderRepoList(repos) {
  repos.forEach(repo => {
    const el = document.querySelector('.repo-list')
    const repoItem = generateListItem(repo)
    el.appendChild(repoItem)
  })
}

function generateListItem(repoName) {
  const node = document.createElement('li')
  node.setAttribute('class', 'repo-item')
  node.appendChild(document.createTextNode(repoName))
  return node
}

/**
 * Resetting.
 */

function resetAllClick() {
  const el = document.getElementById('reset-repos-message')
  toggleDisplay('reset-repos-message', 'block')
}

function resetAllConfirm() {
  chrome.storage.sync.set({ githubRepos: [], githubProfile: '' }, () => {
    const repoListEl = document.querySelector('.repo-list')
    const profileNameEl = document.querySelector('.github-profile')
    repoListEl.innerHTML = ''
    profileNameEl.innerHTML = ''
    toggleDisplay('repos-container', 'none')
    toggleDisplay('reset-repos-message', 'none')
  })
}

function resetAllDeny() {
  toggleDisplay('reset-repos-message', 'none')
}

/**
 * Helpers.
 */

function toggleDisplay(elementId, displayStyle) {
  const el = document.getElementById(elementId)
  el.style.display = displayStyle
}

/**
 * Setup.
 */

function addListeners() {
  document.getElementById('profile-update-button')
    .addEventListener('click', updateGithubProfile)

  document.getElementById('repo-add-button')
    .addEventListener('click', addNewRepo)

  document.getElementById('repo-add-input')
    .addEventListener('keyup', event => {
      if (event.keyCode === 13) {
        addNewRepo()
      }
    })

  document.getElementById('profile-update-input')
    .addEventListener('keyup', event => {
      if (event.keyCode === 13) {
        updateGithubProfile()
      }
    })

  document.getElementById('reset-repos-button')
    .addEventListener('click', resetAllClick)

  document.getElementById('reset-yes-button')
    .addEventListener('click', resetAllConfirm)

  document.getElementById('reset-no-button')
    .addEventListener('click', resetAllDeny)
}

function main() {
  chrome.storage.sync.get('githubProfile', storage => {
    if (storage.githubProfile) {
      setGithubProfile(storage.githubProfile)
      toggleDisplay('repos-container', 'block')
    } else {
      toggleDisplay('reset-repos-message', 'none')
    }
    toggleDisplay('reset-repos-message', 'none')
  })

  chrome.storage.sync.get('githubRepos', storage => {
    if (storage.githubRepos && storage.githubRepos.length) {
      renderRepoList(storage.githubRepos)
    }
  })
}

document.addEventListener('DOMContentLoaded', function () {
  addListeners()
  main()
})