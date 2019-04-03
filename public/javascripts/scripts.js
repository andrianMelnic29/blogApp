$(document).ready(function () {
  $('#like-btn').click(function () {
    // if ($('#like-btn-ico').hasClass('up')) {
    //   $.ajax({
    //     type: 'POST',
    //     url: 'posts/<%=post._id%>/like'
    //   })
    console.log(<%=post._id %>)
  })
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
})
