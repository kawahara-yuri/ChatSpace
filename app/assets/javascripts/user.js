$(function() {
  var search_name = $("#chat-group-form__field--right-name");

  function appenddata(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`;
    search_name.append(html);
  }

  function appendNodata(name) {
    var html = `<div class='chat-group-user'>${ name }</div>`;
    search_name.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    console.log(input);
    $.ajax({
      url: '/users',
      type: "GET",
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#chat-group-form__field--right-name").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appenddata(user);
        });
      }
      else {
        appendNodata("一致するユーザーはいないよ");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗残念');
    })
  });
});
