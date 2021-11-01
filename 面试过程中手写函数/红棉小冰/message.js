

class Message {
  userid: 'id',
  userName: '',
  avator: '',
  msgTypt: '',
  content: '',
  createAt: 'date',
}

Avator
MessageWrapper

MessasgeContainer

messageList

props
  < template >
  <Avator :img="props.avator"></Avator>
  <MessageWrapper :content='props.content'></MessageWrapper>
</ >

  <template v-for='list'>

    <MessasgeContainer>

  </template>

