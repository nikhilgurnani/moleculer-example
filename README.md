# Moleculer Example

This repository is a very simple yet significant example of [Moleculer](https://moleculer.service) framework. Do read about the framework and its usage before diving into the code.
You should also read about [Microservices Architecture](microservices.io) to explain the type of system architecture that this application represents.

## Pre-requisites

The system is organised as containing 2 services - *User* and *Product*. It also contains a *Gateway*, which is the entry point of the system. The Gateway acts as an HTTP Interface between the internet and the application. It communicates with the services using NATS protocol. I highly suggest that you read about NATS [here](https://nats.io). 

At this point, you must be thinking `why NATS?` 
Good question. NATS is **lightweight** as compared to HTTP because its a messaging protocol. Also, it makes it **faster** than HTTP. So we save significant time in network communication from Gateway to Service or from Service to Service. For more information, read [this](https://en.wikipedia.org/wiki/NATS_Messaging). 

Another thing you'll need is MongoDB. Install it on your system by going [here](https://www.mongodb.com/download-center/community). You could also use a docker image for running a mongo container. You'll also have to create a default user in MongoDB with a default username and password, otherwise, you won't be able to connect to database from this app. [This link](https://docs.mongodb.com/manual/tutorial/enable-authentication/#create-the-user-administrator) will help you do that.

## How to setup

- Clone the repository by running `git clone git@github.com:nikhilgurnani/moleculer-example.git`
- Inside the repository folder, run `npm install`

By now you must have noticed that I don't have a `.env` file or a `.env.example` file which may contain the environment variables for the application to run. That's because I've moved from the concept of storing .env variables in a file due to security considerations. Its not secure. 
I mean you could argue using it in Development environment and not production, but its a discussion for later.
Checkout [config.json](moleculer-example/api/libs/config/config.json) for all environment variables and their default values.

You can use custom values of env variables and start the application by simply: 
`NODE_ENV=dev ENV1=value ENV2=value ..... npm run start`

This will set the environment variable(s) and starts the application on port 3000.
##  Supporting
Moleculer-Example is an open source project. It is free to use for your personal learning. Leave a start on Github if it helped you. 😌

Thank you very much!
