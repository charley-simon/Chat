import A11yDialog from 'a11y-dialog'

var dialogEl = document.getElementById('my-dialog')
var dialog = new A11yDialog(dialogEl)

dialog.on('show', function (event) {
  const container = event.target

  // And if the event is the result of a UI interaction (i.e. was not triggered
  // programmatically via `.show(..)`), the `detail` prop contains the original
  // event
  const target = event.detail.target
  const opener = target.closest('[data-a11y-dialog-show]')

  console.log(container, target, opener)
})

// To manually control the dialog:
// dialog.show()
// dialog.hide()
// dialog.destroy()
