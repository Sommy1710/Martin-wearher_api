Weather API
This project is a simple Weather API built with Node.js that fetches weather data from a third-party API (Visual Crossing) and implements in-memory caching using Redis. The purpose of this project is to demonstrate how to work with third-party APIs, caching mechanisms, and environment variables.

Table of Contents:

Introduction
Features
Prerequisites
Installation
Usage
API Endpoints
Environment Variables
Technologies Used
License
Introduction:
This Weather API allows users to fetch current weather data for a specified city by interacting with a third-party API (Visual Crossing). The results are cached in Redis, reducing the number of API requests and improving the performance of the API. Cached data is automatically expired after a set period, ensuring that outdated information is not served to users.

Features:

Fetches weather data from the Visual Crossing API.
Implements in-memory caching with Redis to optimize performance.
Supports environment variables for API keys and Redis configuration.
Automatically expires cached data after 12 hours.
Error handling for invalid city codes and third-party API failures.
Prerequisites:

Node.js: Ensure that Node.js is installed on your machine.
Redis: Make sure Redis is installed and running.
Git: For cloning the repository and version control.
Installation:

Clone the Repository: Use Git to clone the repository to your local machine and navigate into the project directory.
Install Dependencies: Install the necessary dependencies using npm.
Set Up Environment Variables: Create a .env file in the root directory and add the required environment variables, including the Visual Crossing API key.
Run the Server: Start the server and it should be running on http://localhost:3000.
Usage:
To fetch weather data for a specific city, make a GET request to the /weather/:city endpoint, replacing :city with the name of the city for which you want to retrieve the weather data.

Example Response:
A typical response will include weather data such as temperature, humidity, wind speed, and conditions, along with the source of the data (either "api" for a fresh API request or "cache" for cached data).

API Endpoints:

GET /weather/:city: Fetches the current weather data for the specified city. The city name is passed as a URL parameter.

Environment Variables:
The project uses the following environment variables:

WEATHER_API_KEY: The API key for the Visual Crossing weather API.
REDIS_HOST: The host address for the Redis server (default is 127.0.0.1).

Technologies Used:

Node.js: JavaScript runtime environment.
Express.js: Web framework for Node.js.
Axios: Promise-based HTTP client for making API requests.
Dotenv: Module for loading environment variables from a .env file.
License: This project is licensed under the MIT License.
