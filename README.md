# WeatherXM PRO MCP Server

An MCP server implementation exposing the WeatherXM PRO APIs as MCP tools, allowing clients to access weather station data, observations, and forecasts through the MCP protocol.

## Features

- Get stations near a location (latitude, longitude, radius)
- Get stations within a bounding box (min/max latitude and longitude)
- Get all available stations
- Get the latest observation for a specific station
- Get historical observations for a station on a specific date
- Search for H3 cells by region name
- Get stations in a specific H3 cell
- Get weather forecast (daily or hourly) for a specific H3 cell
- Get hyperlocal forecast for a station and variable
- Get forecast performance (FACT) for a station and variable
- Get forecast ranking (FACT) for a station

## Prerequisites

- Node.js and npm installed
- A valid WeatherXM PRO API key

## Configuration

Clone the repository to your local machine.

```bash
git clone https://github.com/WeatherXM/weatherxm-pro-mcp.git
```

## Installation

After cloning the repository, you need to install the dependencies and build the project before running the MCP server.

```bash
npm install
npm run build
```



## Running evals

The evals package loads an mcp client that then runs the index.ts file, so there is no need to rebuild between tests. You can load environment variables by prefixing the npx command. Full documentation can be found [here](https://www.mcpevals.io/docs).

```bash
OPENAI_API_KEY=your-key  npx mcp-eval src/evals/evals.ts src/index.ts
```
## Server Configuration for MCP Clients

This is the common configuration for MCP clients such as Claude Desktop, Cursor, Windsurf Editor, VSCode and plugins such as RooCode and Cline.

```json
{
  "mcpServers": {
    "weatherxm-pro": {
      "command": "npx",
      "args": [
        "-y",
        "path to mcp"
      ],
      "env": {
        "WEATHERXMPRO_API_KEY": "your-api-key"
      }
    }
  }
}
```

Replace `"path to mcp"` with the actual path to the MCP server or package name, and `"your-api-key"` with your WeatherXM PRO API key.
> Note: If you have other MCP servers in use in the client, you can add it to the existing `mcpServers` object.

## Claude Desktop

Follow the steps below to use the WeatherXM PRO MCP server with Claude Desktop MCP client:

1. Edit the MCP settings file located at:

   ```
   ~/Library/Application Support/Claude/claude_desktop_config.json
   ```

2. Add the WeatherXM PRO MCP server configuration under the `mcpServers` object.
3. Restart Claude Desktop to apply the changes.
4. You can now use the server in Claude Desktop to run queries on the WeatherXM PRO MCP server.

## Cursor

Follow the steps below to use the WeatherXM PRO MCP server with Cursor:

1. Install [Cursor](https://cursor.sh/) on your machine.
2. In Cursor, go to Cursor > Cursor Settings > MCP > Add a new global MCP server.
3. Specify the same configuration as in the Server Configuration for MCP Clients section.
4. Save the configuration.
5. You will see weatherxm-pro as an added server in MCP servers list.
6. You can now use the WeatherXM PRO MCP server in Cursor to run queries.

## Windsurf Editor

Follow the steps below to use the WeatherXM PRO MCP server with [Windsurf Editor](https://windsurf.com/):

1. Install Windsurf Editor on your machine.
2. Navigate to Command Palette > Windsurf MCP Configuration Panel or Windsurf - Settings > Advanced > Cascade > Model Context Protocol (MCP) Servers.
3. Click on Add Server and then Add custom server.
4. Add the WeatherXM PRO MCP Server configuration from the Server Configuration for MCP Clients section.
5. Save the configuration.
6. You will see weatherxm-pro as an added server in MCP Servers list.
7. You can now use the WeatherXM PRO MCP server in Windsurf Editor to run queries.

## Docker Image

The MCP server can be built and run as a Docker container.

### Build

```bash
docker build -t weatherxm-pro-mcp .
```

### Run

```bash
docker run -d -p 3000:3000 -e WEATHERXMPRO_API_KEY="your-api-key" -e PORT=3000 weatherxm-pro-mcp
```

Replace `"your-api-key"` with your actual WeatherXM PRO API key.

## Troubleshooting Tips

- Ensure the path to your MCP server repository is correct in the configuration.
- Verify that your WeatherXM PRO API key is set correctly.
- Check that the MCP client configuration matches the server settings.
- Check the logs for any errors or warnings that may indicate issues with the MCP server.

## License

MIT License
