//evals.ts

import { EvalConfig } from 'mcp-evals';
import { openai } from "@ai-sdk/openai";
import { grade, EvalFunction } from "mcp-evals";

const get_stations_nearEval: EvalFunction = {
    name: "get_stations_near Tool Evaluation",
    description: "Evaluates the get_stations_near tool",
    run: async () => {
        const result = await grade(openai("gpt-4"), "Find weather stations near latitude 37.7749, longitude -122.4194 within 1000 meters.");
        return JSON.parse(result);
    }
};

const get_stations_boundsEval: EvalFunction = {
    name: "get_stations_bounds Tool Evaluation",
    description: "Evaluates the bounding box station retrieval functionality",
    run: async () => {
        const result = await grade(openai("gpt-4"), "Retrieve weather stations between latitudes 40 and 41, and longitudes -74 and -73.");
        return JSON.parse(result);
    }
};

const get_all_stationsEval: EvalFunction = {
    name: 'get_all_stations Evaluation',
    description: 'Evaluates retrieving a list of stations',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Could you retrieve all stations using the get_all_stations tool?");
        return JSON.parse(result);
    }
};

const get_latest_observationEval: EvalFunction = {
    name: "get_latest_observation Tool Evaluation",
    description: "Evaluates the retrieval of the latest observation from a weather station",
    run: async () => {
        const result = await grade(openai("gpt-4"), "Retrieve the latest observation from the station with ID 12345.");
        return JSON.parse(result);
    }
};

const get_historical_observationsEval: EvalFunction = {
    name: 'get_historical_observations Tool Evaluation',
    description: 'Evaluates the retrieval of historical observations for a given station and date',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please provide historical weather observations for station ID XYZ123 on 2023-05-10, including temperature and precipitation details.");
        return JSON.parse(result);
    }
};

const config: EvalConfig = {
    model: openai("gpt-4"),
    evals: [get_stations_nearEval, get_stations_boundsEval, get_all_stationsEval, get_latest_observationEval, get_historical_observationsEval]
};
  
export default config;
  
export const evals = [get_stations_nearEval, get_stations_boundsEval, get_all_stationsEval, get_latest_observationEval, get_historical_observationsEval];