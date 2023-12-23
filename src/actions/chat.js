let users = []
users["0"] = {
    id: "0",
    name: "Eric",
    avatar: "avatar-h-2.png",
    chatColor: "bg-secondary",
    msgColor: "text-white",
  };
  users["1"] = {
    id: "1",
    name: "Rodolphe",
    avatar: "avatar-h-1.png",
    chatColor: "bg-success",
    msgColor: "text-success",
  };
users["2"] = {
    id: "2",
    name: "Margaux",
    avatar: "avatar-f-1.png",
    chatColor: "bg-warning",
    msgColor: "text-warning",
  };

let messages = [
  {
    from: "1",
    msg: "Bonjour Eric",
  },
  {
    from: "1",
    msg: "Comment vas-tu ?",
  },
  {
    from: "0",
    msg: "Ca va bien, et toi ?",
  },
  {
    from: "2",
    msg: "Coucou, alors ça boum ?",
  },
]


export const chat = (req, res) => {
  let userId = "0";
  let user = users[userId]

  res.view("templates/shared/chat.ejs", {
      user: user,
      users: users,
      messages : messages,
//      userSession: req.session.get('user'),
  });
}

export const sendMessage = async (req, res) => {
  // const params = {}
  if (req.method === 'POST') {
    let user = users[req.body.user]
    
    messages.push( {from: user.id, msg: req.body.message} )
  }
  return res.redirect("/chat");
}
