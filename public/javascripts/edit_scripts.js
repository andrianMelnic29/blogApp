$(document).ready(function () {
  if ($('#edit-post-img').attr('data-src').indexOf('uploads/images') != -1) {
    $('#edit-post-img').attr('data-src', '/' + $('#edit-post-img').attr('data-src'))
    // console.log($('#edit-post-img').attr('data-src'))
  }
  $('#image-edit-btn').click(function () {
    $('#image-post-modal').modal('show')
  })
  $('#load-image-btn').click(function () {
    $('#upload-field').show()
    $('#url-field').hide()
    $('#image-post-modal').modal('hide')
    $('#url-field').hide()
    $("#url-field input[name = 'imageURL']").val('')
  })
  $('#url-image-btn').click(function () {
    $('#upload-field').hide()
    $('#url-field').show()
    $('#image-post-modal').modal('hide')
    $("#upload-field input[name = 'imageUpload']").val('')

  })
})
