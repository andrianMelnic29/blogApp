$(document).ready(function () {
  $('#text-post-btn').click(function () {
    $('#text-post-modal').modal('show')
  })
  $('#image-post-btn').click(function () {
    $('#image-post-modal').modal('show')
  })
  $('#video-post-btn').click(function () {
    $('#video-post-modal').modal('show')
  })

  $('#load-image-btn').click(function () {
    $('#image-post-load').modal('show')
  })
  $('#url-image-btn').click(function () {
    $('#image-post-url').modal('show')
  })
})
