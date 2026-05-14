import urllib.request
import json

url = "http://localhost:8001/simulate"
payload = {
    "gates": ["H", "X"],
    "initial_angles": {"theta": 0, "phi": 0}
}

data = json.dumps(payload).encode('utf-8')
req = urllib.request.Request(url, data=data)
req.add_header('Content-Type', 'application/json')

try:
    with urllib.request.urlopen(req) as response:
        print(f"Status Code: {response.getcode()}")
        if response.getcode() == 200:
            print("Success!")
            # print(response.read().decode())
        else:
            print(f"Error: {response.read().decode()}")
except Exception as e:
    print(f"Exception: {e}")
    if hasattr(e, 'read'):
        print(f"Error detail: {e.read().decode()}")
