component Input {
  connect ThemeStore exposing { primary }

  property placeholder : String = ""
  property type : String = "text"
  property value : String
  property onChange : Function(Html.Event, Promise(Never, Void))

  style base {
    min-width: 175px;
    border-radius: 4px;
    border: 1px solid #{primary};
    padding: 8px;
  }

  fun render {
    <input::base
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}/>
  }
}
