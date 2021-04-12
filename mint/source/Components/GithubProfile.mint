component GithubProfile {
  property profile : String

  style profile {
    font-family: monospace;
    font-size: x-large;
    font-weight: lighter;
    margin-left: 0.25rem;
  }

  fun render {
    <h3>
      "GitHub profile:"

      <span::profile>
        <{ profile }>
      </span>
    </h3>
  }
}
