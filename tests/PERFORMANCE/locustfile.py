from locust import HttpUser, TaskSet, task, between

class UserBehavior(TaskSet):
    @task(1)
    def get_users(self):
        response = self.client.get("/api/users?page=2")
        if response.status_code == 200:
            print("Successfully fetched users")
        else:
            print(f"Failed to fetch users: {response.status_code}")

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(1, 5)
    host = "https://reqres.in"  # Base URL for the API