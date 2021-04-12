component ResetForm {
  connect ChromeStorageStore exposing { resetStore }
  property resetConfirmOpen : Bool
  property toggleResetConfirm : Function(Promise(Never, Void))

  fun handleRestConfirm : Promise(Never, Void) {
    parallel {
      `chromeResetAll()`
      resetStore()
      toggleResetConfirm()
    }
  }

  style resetConfirm {
    button {
      margin-right: 12px;
    }
  }

  fun render {
    <div>
      <Button
        variant={ButtonVariants::Outlined}
        onClick={toggleResetConfirm}>

        "Reset all"

      </Button>

      <If condition={resetConfirmOpen == true}>
        <div::resetConfirm>
          <p>"Are you sure?"</p>

          <Button onClick={toggleResetConfirm}>
            "No"
          </Button>

          <Button
            variant={ButtonVariants::Outlined}
            onClick={handleRestConfirm}>

            "Yes"

          </Button>
        </div>
      </If>
    </div>
  }
}
