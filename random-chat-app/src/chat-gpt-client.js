export async function getAIResponse(message) {
    return fetch('http://localhost:3000/airesponse', 
        {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                    {'message': message}
                )
        }
    )
    .then(function(response) { return response.json(); })
    .then(function(json) { return json.message });
}