let users = [];

// On charge la liste des utilisateurs
users["0"] =
{
    id: "0",
    name: "Eric",
    avatar: "avatar-h-2.png",
    chatColor: "lightgrey",
    msgColor: "text-white",
};
users["1"] =
{
    id: "1",
    name: "Rodolphe",
    avatar: "avatar-h-1.png",
    chatColor: "deepskyblue",
    msgColor: "text-success",
};
users["2"] =
{
    id: "2",
    name: "Margaux",
    avatar: "avatar-f-1.png",
    chatColor: "burlywood",
    msgColor: "text-warning",
};

// On charge la liste des messages

let messages = [
  {
    from: "1",
    content: "Bonjour Eric",
    time: "18:06 | 24 Juillet",
  },
  {
    from: "1",
    content: "Comment vas-tu ?",
    time: "18:07 | 24 Juillet",
  },
  {
    from: "0",
    content: "Ca va bien, et toi ?",
    time: "18:10 | 24 Juillet",
  },
  {
    from: "2",
    content: "Coucou, alors ça boum ?",
    time: "18:27 | 24 Juillet",
  },
]

export const displayAllMsgs = (req, res) => {
  let user = users["0"]
  console.log("User: " + user )
  res.view("templates/shared/displayAllMsgs.ejs", {
      user: user,
      users: users,
      messages : messages,
//      userSession: req.session.get('user'),
  });
}

export const sendNewMsg = async (req, res) => {
  // const params = {}
  console.log( "sendNewMsg: " + req.body.message )
  if (req.method === 'POST') {
    let user = users[req.body.user]
    let today = new Date().getTime()
    console.log( "Message: " + req.body.message )
    messages.push( {from: user.id, content: req.body.message, time: today} )
  }
  return res.redirect("/messages");
}
