#!/usr/bin/env node
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import axios from 'axios';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const API_KEY = process.env.WEATHERXMPRO_API_KEY;
if (!API_KEY) {
  throw new Error('WEATHERXMPRO_API_KEY environment variable is required');
}

const baseUrl = "https://pro.weatherxm.com/api/v1";

// Create an MCP server
const server = new McpServer({
  name: "weatherxm-pro-mcp-server",
  version: "0.5.0"
});

// Create axios instance with API key
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'X-API-KEY': API_KEY
  }
});

// Add MCP tool for getStationsNear
server.tool(
  "get_stations_near",
  {
    lat: z.number().describe("Latitude of the center of the area"),
    lon: z.number().describe("Longitude of the center of the area"),
    radius: z.number().describe("Radius in meters for which stations are queried"),
  },
  async ({ lat, lon, radius }) => {
    try {
      const response = await axiosInstance.get('/stations/near', {
        params: { lat, lon, radius },
      });
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          content: [{ type: "text", text: `WeatherXM API error: ${error.response?.data.message ?? error.message}` }],
          isError: true,
        };
      }
      throw error;
    }
  }
);

// Add MCP tool for getStationsBounds
server.tool(
  "get_stations_bounds",
  {
    min_lat: z.number().describe("Minimum latitude of the bounding box"),
    min_lon: z.number().describe("Minimum longitude of the bounding box"),
    max_lat: z.number().describe("Maximum latitude of the bounding box"),
    max_lon: z.number().describe("Maximum longitude of the bounding box"),
  },
  async ({ min_lat, min_lon, max_lat, max_lon }) => {
    try {
      const response = await axiosInstance.get('/stations/bounds', {
        params: { min_lat, min_lon, max_lat, max_lon },
      });
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          content: [{ type: "text", text: `WeatherXM API error: ${error.response?.data.message ?? error.message}` }],
          isError: true,
        };
      }
      throw error;
    }
  }
);

// Add MCP tool for getAllStations
server.tool(
  "get_all_stations",
  {},
  async () => {
    try {
      const response = await axiosInstance.get('/stations');
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          content: [{ type: "text", text: `WeatherXM API error: ${error.response?.data.message ?? error.message}` }],
          isError: true,
        };
      }
      throw error;
    }
  }
);

// Add MCP tool for getLatestObservation
server.tool(
  "get_latest_observation",
  {
    station_id: z.string().describe("The unique identifier of the station"),
  },
  async ({ station_id }) => {
    try {
      const response = await axiosInstance.get(`/stations/${station_id}/latest`);
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          content: [{ type: "text", text: `WeatherXM API error: ${error.response?.data.message ?? error.message}` }],
          isError: true,
        };
      }
      throw error;
    }
  }
);

// Add MCP tool for getHistoricalObservations
server.tool(
  "get_historical_observations",
  {
    station_id: z.string().describe("The unique identifier of the station"),
    date: z.string().describe("Date (YYYY-MM-DD) for historical observations"),
  },
  async ({ station_id, date }) => {
    try {
      const response = await axiosInstance.get(`/stations/${station_id}/history`, {
        params: { date },
      });
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          content: [{ type: "text", text: `WeatherXM API error: ${error.response?.data.message ?? error.message}` }],
          isError: true,
        };
      }
      throw error;
    }
  }
);

// Add MCP tool for searchCellsInRegion
server.tool(
  "search_cells_in_region",
  {
    region_query: z.string().describe("The name of the region to search for cells"),
  },
  async ({ region_query }) => {
    try {
      const response = await axiosInstance.get('/cells/search', {
        params: { query: region_query },
      });
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          content: [{ type: "text", text: `WeatherXM API error: ${error.response?.data.message ?? error.message}` }],
          isError: true,
        };
      }
      throw error;
    }
  }
);

// Add MCP tool for getStationsInCell
server.tool(
  "get_stations_in_cell",
  {
    cell_index: z.string().describe("The H3 index of the cell to return stations for"),
  },
  async ({ cell_index }) => {
    try {
      const response = await axiosInstance.get(`/cells/${cell_index}/stations`);
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          content: [{ type: "text", text: `WeatherXM API error: ${error.response?.data.message ?? error.message}` }],
          isError: true,
        };
      }
      throw error;
    }
  }
);

// Add MCP tool for getForecastForCell
server.tool(
  "get_forecast_for_cell",
  {
    forecast_cell_index: z.string().describe("The H3 index of the cell to get forecast for"),
    forecast_from: z.string().describe("The first day for which to get forecast data (YYYY-MM-DD)"),
    forecast_to: z.string().describe("The last day for which to get forecast data (YYYY-MM-DD)"),
    forecast_include: z.enum(['daily', 'hourly']).describe('Types of forecast to include'),
  },
  async ({ forecast_cell_index, forecast_from, forecast_to, forecast_include }) => {
    try {
      const response = await axiosInstance.get(`/cells/${forecast_cell_index}/forecast`, {
        params: {
          from: forecast_from,
          to: forecast_to,
          include: forecast_include,
        },
      });
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          content: [{ type: "text", text: `WeatherXM API error: ${error.response?.data.message ?? error.message}` }],
          isError: true,
        };
      }
      throw error;
    }
  }
);


// Add MCP tool for getHyperlocalForecast
server.tool(
  "get_hyperlocal_forecast",
  {
    station_id: z.string().describe("The station to get the forecast for."),
    variable: z.string().describe("The weather variable to get the forecast for."),
    timezone: z.string().optional().describe("The timezone to get forecast for. Defaults to station location timezone."),
  },
  async ({ station_id, variable, timezone }) => {
    const allowedVariables = ["temperature", "humidity", "precipitation", "windSpeed", "windDirection"];
    if (!allowedVariables.includes(variable)) {
      return {
        content: [{ type: "text", text: `Invalid variable provided: ${variable}. Allowed variables are: ${allowedVariables.join(", ")}` }],
        isError: true,
      };
    }
    try {
      const response = await axiosInstance.get(`/stations/${station_id}/hyperlocal`, {
        params: { variable, timezone },
      });
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          content: [{ type: "text", text: `WeatherXM API error: ${error.response?.data.message ?? error.message}` }],
          isError: true,
        };
      }
      throw error;
    }
  }
);

// Add MCP tool for getFactPerformance
server.tool(
  "get_fact_performance",
  {
    station_id: z.string().describe("The station to get the forecast performance for."),
    variable: z.string().describe("The weather variable to get the forecast for."),
  },
  async ({ station_id, variable }) => {
    const allowedVariables = ["temperature", "humidity", "precipitation", "windSpeed", "windDirection"];
    if (!allowedVariables.includes(variable)) {
      return {
        content: [{ type: "text", text: `Invalid variable provided: ${variable}. Allowed variables are: ${allowedVariables.join(", ")}` }],
        isError: true,
      };
    }
    try {
      const response = await axiosInstance.get(`/stations/${station_id}/fact/performance`, {
        params: { variable },
      });
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          content: [{ type: "text", text: `WeatherXM API error: ${error.response?.data.message ?? error.message}` }],
          isError: true,
        };
      }
      throw error;
    }
  }
);

// Add MCP tool for getFactRanking
server.tool(
  "get_fact_ranking",
  {
    station_id: z.string().describe("The station to get the forecast ranking for."),
  },
  async ({ station_id }) => {
    try {
      const response = await axiosInstance.get(`/stations/${station_id}/fact/ranking`);
      return {
        content: [{ type: "text", text: JSON.stringify(response.data, null, 2) }],
      };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return {
          content: [{ type: "text", text: `WeatherXM API error: ${error.response?.data.message ?? error.message}` }],
          isError: true,
        };
      }
      throw error;
    }
  }
);

// Start the server
async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('WeatherXM PRO MCP server running on stdio');
}

run().catch(error => {
  console.error('Error running MCP server:', error);
  process.exit(1);
});