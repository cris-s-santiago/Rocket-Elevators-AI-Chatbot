'use strict';

// Require express and body-parser
import express, { json } from "express";
import { gql, GraphQLClient } from 'graphql-request'

// Initialize express and define a port
const app = express()
const PORT = process.env.PORT || 3000;
app.use(json());


// Query to get all the information for the main message
async function main(){

    const endpoint = 'https://rocketfoundationgraphqlapi.herokuapp.com/graphql'
    const graphQLClient = new GraphQLClient(endpoint, { headers: {} })
    const query = gql`
        query message{
            elevatorCount
            buildingCount
            customerCount
            notRunningElevatorCount
            batteryCount
            citiesCount
            quoteCount
            leadCount
        }
        `
    const response = await graphQLClient.request(query);
    console.log(response);
    return response;
}

// Query to get the elevator status using the id provided
async function elevatorStatus(elevatorId){

    const endpoint = 'https://rocketfoundationgraphqlapi.herokuapp.com/graphql'
    const graphQLClient = new GraphQLClient(endpoint, { headers: {} })
    const query = gql`
        query elevatorStatus($id:Int!){
            elevatorStatusById(id:$id)
        }
        `
    const variables = {
        id: elevatorId,
      }
    const response = await graphQLClient.request(query, variables);
    console.log(response);
    let message = [{"text": {"text": ["Hey!"+'\n'+"The status of the Elevator #"+elevatorId+" is: "+response.elevatorStatusById]}}]
    return message;
}


// The main endpoint
app.post("/test",async (req, res) => {

    console.log(req.body) // Call your action on the request here

    if (req.body.queryResult.intent.displayName === "elevatorStatus"){ // if the intent name is elevatorStatus
        let id = req.body.queryResult.parameters.elevatorId;
        let message;
        elevatorStatus(id).then((response) => {message = { fulfillmentMessages: response }; res.json(message)})
    }else{ // If its not elevatorStatus
        main().then((response) => {responseMessage(response.elevatorCount,response.buildingCount,response.customerCount,response.notRunningElevatorCount,response.batteryCount,response.citiesCount,response.quoteCount,response.leadCount)}).catch((error) => console.error(error))
    }

    function responseMessage(AmountOfElevators,AmountOfBuildings,AmountOfCustomers,AmountOfInactiveElevators,AmountOfBatteries,AmountOfCities,AmountOfQuotes,AmountOfLeads){
        let resContent = [{"text": {"text": [
            "Greetings"+'\n'+
            "There are currently "+AmountOfElevators+" elevators deployed in the "+AmountOfBuildings+" buildings of your "+AmountOfCustomers+" customers"+'\n'+
            "Currently, "+AmountOfInactiveElevators+" elevators are not in Running Status and are being serviced"+'\n'+
            AmountOfBatteries+" Batteries are deployed across "+AmountOfCities+" cities"+'\n'+
            "On another note you currently have "+AmountOfQuotes+" quotes awaiting processing"+'\n'+
            "You also have "+AmountOfLeads+" leads in your contact requests"
        ]}}];
        let resObj = { fulfillmentMessages: resContent };
        res.json(resObj)
    }
    
});

// Start express on the defined port
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))