$(document).ready(function () {
  $('#text-post-btn').click(function () {
    $('#text-post-modal').modal('show')
  })
  $('#image-post-btn').click(function () {
    $('#image-post-modal').modal('show')
  })

  $('#load-image-btn').click(function () {
    $('#image-post-load').modal('show')
  })
  $('#url-image-btn').click(function () {
    $('#image-post-url').modal('show')
  })
  $('.post-image img')
    .visibility({
      type: 'image',
      transition: 'fade in',
      duration: 1000
    })

  // $('#edit-btn').click(function () {
  //   if ($(".post-image img[data-src = '']")) {
  //     $('#text-edit-modal').modal('show')
  //   } else {
  //     $('#img-edit-modal').modal('show')
  //   }
  // })
})