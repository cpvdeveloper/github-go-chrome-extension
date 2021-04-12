enum ButtonVariants {
  Contained
  Outlined
}

component Button {
  connect ThemeStore exposing { primary }
  property children : Array(Html) = []
  property disabled : Bool = false
  property variant : ButtonVariants = ButtonVariants::Contained

  property onClick : Function(Promise(Never, Void)) = () : Promise(Never, Void) { next {  } }

  style base {
    font-weight: bold;
    text-transform: uppercase;
    padding: 6px;
    cursor: pointer;
    border: 1px solid #{primary};
    border-radius: 4px;
    min-width: 65px;
  }

  style colorStyle (variant : ButtonVariants) {
    case (variant) {
      ButtonVariants::Contained => background: #{primary};
      ButtonVariants::Outlined => background: none;
    }

    case (variant) {
      ButtonVariants::Contained => color: white;
      ButtonVariants::Outlined => color: #{primary};
    }
  }

  fun render : Html {
    <button::base::colorStyle(variant)
      onClick={onClick}
      disabled={disabled}>

      <{ children }>

    </button>
  }
}
