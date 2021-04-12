/* A store which will be kept in sync with the Chrome browser storage */
store ChromeStorageStore {
  state githubProfile : String = ""
  state githubRepos : Array(String) = []

  fun setProfile (profileName : String) : Promise(Never, Void) {
    next { githubProfile = profileName }
  }

  fun resetProfile : Promise(Never, Void) {
    next { githubProfile = "" }
  }

  fun setRepos (reposList : Array(String)) : Promise(Never, Void) {
    next { githubRepos = reposList }
  }

  fun resetRepos : Promise(Never, Void) {
    next { githubRepos = [] }
  }

  fun resetStore : Promise(Never, Void) {
    parallel {
      resetProfile()
      resetRepos()
    }
  }
}
