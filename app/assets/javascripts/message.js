$(function(){
  function buildHTML(message){
    var input;
    if (message.content != null && message.image_url != null) {
      body =  `<p class="lower-message__content">
                  ${message.content}</p>
                <img src ="${message.image_url}" width="300" height="300", class: 'lower-message__image' >`;
    } else if (message.image_url == null) {
      body =  `<p class="lower-message__content">
                  ${message.content}</p>`;
    } else if (message.content == null) {
      body = `<img src ="${message.image_url}" width="250" height="250", class: 'lower-message__image' >`;
    }

    var html = `<div class="chat-main__body--messages-list">
                  <div class="chat-main__message.clearfix">
                    <div class="chat-main__message-name">
                      ${message.user_name}
                    </div>
                    <div class="chat-main__message-time">
                      ${message.time}
                    </div>
                    <div class="chat-main__message-body">
                      ${body}
                    </div>
                  </div>
                </div>`;
    return html;
  }
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__body').append(html);
      $('.message').val('');
      $('.image').val('');
      $('.chat-main__body').animate({scrollTop: 999999}, 500, 'swing');
      $(".submit").prop("disabled", false);
    })
    .fail(function(){
      alert('error');
      $(".submit").prop("disabled", false);
    });
  });
});
