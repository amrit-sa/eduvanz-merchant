export default function authHeader() {
  const user  = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");
  if (user && token ) {
    return { Authorization: "Bearer " + token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  } else {
    return {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'};
  }
}

export function eduvazHeader(){
        const channel_id     = process.env.REACT_APP_USER_CHANNEL_ID;
        const client_id      = process.env.REACT_APP_USER_CLIENT_ID;
        const client_secret  = process.env.REACT_APP_USER_CLIENT_SECRET;
        const transaction_id = Math.floor(100000 + Math.random() * 900000);
        return {
          'Content-Type': 'application/json', 
          'Access-Control-Allow-Origin': '*',
          'channel_id': channel_id,
          'client_id': client_id,
          'client_secret': client_secret,
          'transaction_id': transaction_id
        };
}
