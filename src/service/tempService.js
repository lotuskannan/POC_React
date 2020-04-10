import axios from 'axios';

export const tempService = {
  setSave,
}
function setSave(Payloadbody) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'    
    },
    body: JSON.stringify(Payloadbody),
  }
  return fetch(
    'http://localhost/Naga_POC/saveStatus.php',
    requestOptions,
  )   
    .then(Reqsave => {
      return Reqsave
    })
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
      }
      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }
    return data
  })
}