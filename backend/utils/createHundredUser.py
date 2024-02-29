import requests
from faker import Faker

fake = Faker()

def make_api_requests(api_url, num_requests):
    for index in range(num_requests):
        data = {
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "email": fake.email(),
            "password": fake.password(),
        }
        response = requests.post(api_url,data=data)
        data = {
            "email": data["email"],
            "password": data["password"],
        }
        response = requests.post("http://localhost:8000/api/v1/profile/login/",data=data)
        response_json = response.json()
        data = {
            "mentorInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
            "studentInfo": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation",
        }
        headers = {
            "Authorization": f"Token {response_json["key"]}",
            "Content-Type": "application/json",  # İsteğin içeriğinin JSON olduğunu belirtmek için
        }
        response = requests.post("http://localhost:8000/api/v1/profile/fill-profile-data/",json=data,headers=headers)
        response = requests.get("http://localhost:8000/api/v1/profile/logout/",headers=headers)
        print(index)
    print("done")
if __name__ == "__main__":
    api_url = "http://localhost:8000/api/v1/profile/register/"  # API'nin URL'sini buraya ekleyin
    num_requests = 2000

    make_api_requests(api_url, num_requests)