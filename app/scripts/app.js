var client;
let accessToken;
let owner ;
let repo ;

init();

async function init() {
  client = await app.initialized();
  client.events.on('app.activated', renderText);
}

async function renderText() {
try{
  let credentials =await client.iparams.get();
  console.log(credentials);

  accessToken = credentials.api_value;
  owner=credentials.id_value;
  repo=credentials.repo_value;

}catch(error){
  console.error(error);
}
}
async function getTicketDetails() {
  
  try {
    const data = await client.data.get("ticket");
    // success output
    // data is {ticket: {"subject": "support needed for..",..}}
    let mydata = data.ticket.subject;
    let mydescription = data.ticket.description;
    
    


const issueData = {
  title: mydata,
  body: mydescription,
  
};

fetch(`https://api.github.com/repos/${owner}/${repo}/issues`, {
  method: 'POST',
  headers: {
    'Authorization': `token ${accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(issueData),
})
  .then(response => response.json())
  .then(data => {
    console.log('Created issue:', data);
  })
  .catch(error => {
    console.error('Error creating issue:', error);
  });
  } catch (error) {
    // failure operation
    console.log(error);
  }
}





                        
