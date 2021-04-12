component ReposList {
  property repos : Array(String) = []

  style base {
    padding: 0;
    margin-bottom: 12px;
  }

  style listItem {
    list-style: none;
    padding-bottom: 0.25rem;
    font-family: monospace;
    font-size: 1.25rem;
  }

  fun render {
    <div>
      <h3>"Repositories"</h3>

      <ul::base>
        for (repo of repos) {
          <li::listItem>
            <{ repo }>
          </li>
        }
      </ul>
    </div>
  }
}
