# CaptureIt

<h3>CaptureIt is a platform for sharing images.</h3>

## How to Run

### Presiquences
To get started with CaptureIt, ensure you have Docker Engine installed and running on your system.

### Running the Application

#### Clone the repository
```sh
 git clone https://github.com/dimitarNzhelev/captureit.git
```

#### Run the `docker-compose.yaml` file
Depending on your operating system and Docker Compose version, you can run the `docker-compose.yaml` file using one of the following commands:

```sh
docker compose up
```
or 
```sh
docker-compose up
```

<b>Note: </b>Make sure to execute the command from the directory containing the `docker-compose.yaml` file.

### Important Information
When you run the application, a new folder is created to act as a volume for the database. This folder stores all the database information, ensuring that your data is preserved even if the container is stopped or deleted.