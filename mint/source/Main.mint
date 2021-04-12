component Main {
  connect ChromeStorageStore exposing { githubProfile as profile, setProfile, githubRepos as repos, setRepos }
  state resetConfirmOpen : Bool = false
  state profileInput : String = ""
  state repoInput : String = ""

  fun componentDidMount : Promise(Never, Void) {
    parallel {
      profileName =
        `chromeGetProfile()`

      storedRepos =
        `chromeGetRepos()`
    } then {
      parallel {
        setProfile(profileName)
        setRepos(storedRepos)
      }
    }
  }

  fun toggleResetConfirm : Promise(Never, Void) {
    next { resetConfirmOpen = newResetConfirmState }
  } where {
    newResetConfirmState =
      if (resetConfirmOpen == true) {
        false
      } else {
        true
      }
  }

  fun handleProfileInputChange (event : Html.Event) : Promise(Never, Void) {
    next { profileInput = Dom.getValue(event.target) }
  }

  fun handleRepoInputChange (event : Html.Event) : Promise(Never, Void) {
    next { repoInput = Dom.getValue(event.target) }
  }

  fun handleProfileUpdate : Promise(Never, Void) {
    parallel {
      `chromeSetProfile(#{profileInput})`
      setProfile(profileInput)
      next { profileInput = "" }
    }
  }

  fun handleRepoAdd : Promise(Never, Void) {
    parallel {
      `chromeSetRepos([...#{repos}, #{repoInput}])`
      setRepos(Array.push(repoInput, repos))
      next { repoInput = "" }
    }
  }

  fun render : Html {
    <div>
      <GithubProfile profile={profile}/>

      <FieldWrapper>
        <Input
          value={profileInput}
          onChange={handleProfileInputChange}
          placeholder="Enter new GitHub profile"/>

        <Button onClick={handleProfileUpdate}>
          "Update"
        </Button>
      </FieldWrapper>

      <If condition={profile != ""}>
        <ReposList repos={repos}/>

        <FieldWrapper>
          <Input
            value={repoInput}
            onChange={handleRepoInputChange}
            placeholder="Add a new repo"/>

          <Button onClick={handleRepoAdd}>
            "Add"
          </Button>
        </FieldWrapper>

        <ResetForm
          resetConfirmOpen={resetConfirmOpen}
          toggleResetConfirm={toggleResetConfirm}/>
      </If>
    </div>
  }
}
