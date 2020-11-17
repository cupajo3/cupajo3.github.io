// You may wish to find an effective randomizer function on MDN.

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(org, comparison, key) {
  if (org[key] < comparison[key]) {
    return -1;
  } if (org[key] > comparison[key]) {
    return 1;
  }
  return 0;
}

// Taken from MDN Math random docs//
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive 
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  // set fave to yes
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => {
      // You're going to do your lab work in here. Replace this comment.
      
      console.log('jsonFromServer', jsonFromServer);
      const reverseList = newArr2.sort((a, b) => sortFunction(b, a, 'name'));
    })
    .catch((err) => {
      console.log(err)
      // set fave to no
    });
});