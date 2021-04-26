
# <div align="center"> :star2: RocketElevators AI Chatbot :star2:


## <div align="center"> :round_pushpin: About The Project
<div align="center">
 This is a really simple 'webhook' using expressJs
 Receives POST requests from dialogflow and returns a message

---

## <div align="center"> :arrow_forward:What does it do?

<div align="center">  -Receives a POST request from dialogflow to [websiteUrl/test]()  </div>
<div align="center">   -Check the request if it's <b>elevatorStatus</b>  </div>
<div align="center">     -If it's <b>elevatorStatus</b> it gets the parameter and send a graphql query to retrieve the elevatorStatus  </div>
<div align="center">     -If it's anything else it sends a query to build the message using the count of many components  </div>
<div align="center"> -Then the SlackBot is able to response if the chat!  </div>
 











