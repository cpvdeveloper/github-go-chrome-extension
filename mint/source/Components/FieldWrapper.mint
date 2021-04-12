component FieldWrapper {
  property children : Array(Html) = []
  property marginBottom : Number = 20

  style base {
    display: flex;
    justify-content: space-between;
    margin-bottom: #{marginBottom}px;
  }

  fun render {
    <div::base>
      <{ children }>
    </div>
  }
}
