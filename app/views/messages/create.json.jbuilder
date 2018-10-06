
json.content  @message.content
json.user_name  @message.user.name
json.time  format_posted_time(@message.created_at)
json.image_url  @message.image.url
json.id         @message.id
