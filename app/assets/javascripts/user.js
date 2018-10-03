$(function() {
  var search_name = $("#user-search-result");

  function appendData(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`;
    search_name.append(html);
  }

  function appendNoData(name) {
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
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendData(user);
        });
      }
      else {
        appendNoData("一致するユーザーはいないよ");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗残念');
    })
  });


  var member = $("#chat-group-form__field--right-name");

  function appendDataRemove(name, id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`;
    member.append(html);
  }

  $(document).on("click", ".user-search-add", function(){
    var user = $(this).data();
    appendDataRemove(user["userName"], user["userId"]);
    $(this).parent().remove();
  })

  $(document).on("click", ".user-search-remove", function(user){
    $(this).parent().remove();
  })
});
