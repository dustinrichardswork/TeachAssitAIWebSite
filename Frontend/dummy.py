import requests
import json

# Define the API endpoint
url = "http://localhost:4000/api/v1/admin/post/new"

# Define your authorization token
authorization_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTliMWQ1NmM0OTk5MWI1MzA5MDQ0NyIsImlhdCI6MTY5MzA0NDMwNiwiZXhwIjoxNjkzNjQ5MTA2fQ.JIiD4F_a3UIptnlmoalr7Rk18UyywbT2juKiB9zo9_w"

# Dummy entries with the same image link
entries = [
    {
        "title": "Entry 2",
        "shortDescription": "Short description for Entry 2.",
        "longDescription": "Long description for Entry 2.",
        "image": "https://via.placeholder.com/300"
    },
    {
        "title": "Entry 3",
        "shortDescription": "Short description for Entry 3.",
        "longDescription": "Long description for Entry 3.",
        "image": "https://via.placeholder.com/300"
    },
    {
        "title": "Entry 4",
        "shortDescription": "Short description for Entry 4.",
        "longDescription": "Long description for Entry 4.",
        "image": "https://via.placeholder.com/300"
    },
    {
        "title": "Entry 5",
        "shortDescription": "Short description for Entry 5.",
        "longDescription": "Long description for Entry 5.",
        "image": "https://via.placeholder.com/300"
    },
    {
        "title": "Entry 6",
        "shortDescription": "Short description for Entry 6.",
        "longDescription": "Long description for Entry 6.",
        "image": "https://via.placeholder.com/300"
    },
    {
        "title": "Entry 7",
        "shortDescription": "Short description for Entry 7.",
        "longDescription": "Long description for Entry 7.",
        "image": "https://via.placeholder.com/300"
    },
    {
        "title": "Entry 8",
        "shortDescription": "Short description for Entry 8.",
        "longDescription": "Long description for Entry 8.",
        "image": "https://via.placeholder.com/300"
    },
    {
        "title": "Entry 9",
        "shortDescription": "Short description for Entry 9.",
        "longDescription": "Long description for Entry 9.",
        "image": "https://via.placeholder.com/300"
    },
    {
        "title": "Entry 10",
        "shortDescription": "Short description for Entry 10.",
        "longDescription": "Long description for Entry 10.",
        "image": "https://via.placeholder.com/300"
    }
]

# Loop through the entries and post to the backend
for entry in entries:
    headers = {
        "Authorization": f"Bearer {authorization_token}",
        "Content-Type": "application/json"
    }
    
    response = requests.post(url, headers=headers, data=json.dumps(entry))
    
    if response.status_code == 200:
        print(f"Entry '{entry['title']}' posted successfully!")
    else:
        print(f"Failed to post entry '{entry['title']}' - Status code: {response.status_code}")
        print(response.text)
