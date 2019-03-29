$(document).ready(function () {
  if ($('#edit-post-img').attr('data-src') !== '/') {
    $('#edit-post-upload').hide()
  } else {
    $('#edit-post-upload').show()
  }
})
