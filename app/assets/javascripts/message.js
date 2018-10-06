$(function(){
  var id_max = 1;
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
      id_max = data.id;
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $(".submit").prop("disabled", false);
    })
  });


  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: window.location.href,
        dataType: 'json'
      })
      .done(function(data) {
        $('.chat-main__body--messages-list').each(function() {
          var id_comp = $(this).data('messageId');
          if(id_max <=  id_comp) {
            id_max = id_comp;
          }
        });
        var insertHTML = '';
        data.messages.forEach(function(message) {
          if (message.id > id_max ) {
            insertHTML += buildHTML(message);
            $('.chat-main__body').append(insertHTML);
            $('.chat-main__body').animate({scrollTop: 999999}, 500, 'swing');
            id_max = message.id;
          }
        });
      })
      .fail(function(data) {
        alert('自動更新に失敗しました');
      });
    } else {
      clearInterval(interval);
    };
  }, 5000 );
});
