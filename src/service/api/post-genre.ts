import { Genre } from '../../types/genre';

export async function postData( data:Genre ) {
  const response = await fetch('http://localhost:3001/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
