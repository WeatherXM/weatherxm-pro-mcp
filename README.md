# WeatherXM PRO MCP Server

This MCP server exposes the WeatherXM PRO APIs as MCP tools, allowing clients to access weather station data, observations, and forecasts through the MCP protocol.

## Overview

The server provides access to various WeatherXM PRO API endpoints as MCP tools, including:

- Get stations near a location (latitude, longitude, radius)
- Get stations within a bounding box (min/max latitude and longitude)
- Get all available stations
- Get the latest observation for a specific station
- Get historical observations for a station on a specific date
- Search for H3 cells by region name
- Get stations in a specific H3 cell
- Get weather forecast (daily or hourly) for a specific H3 cell

## MCP Tools

### get_stations_near

Get stations within a radius from a location.

**Input:**

- `lat` (number): Latitude of the center of the area
- `lon` (number): Longitude of the center of the area
- `radius` (number): Radius in meters

### get_stations_bounds

Get stations within a bounding box.

**Input:**

- `min_lat` (number): Minimum latitude of the bounding box
- `min_lon` (number): Minimum longitude of the bounding box
- `max_lat` (number): Maximum latitude of the bounding box
- `max_lon` (number): Maximum longitude of the bounding box

### get_all_stations

Get all available stations.

**Input:** None

### get_latest_observation

Get the latest weather observation for a specific station.

**Input:**

- `station_id` (string): Unique identifier of the station

### get_historical_observations

Get historical weather observations for a station on a specific date.

**Input:**

- `station_id` (string): Unique identifier of the station
- `date` (string): Date in YYYY-MM-DD format

### search_cells_in_region

Search for H3 cells by region name.

**Input:**

- `region_query` (string): Name of the region to search for cells

### get_stations_in_cell

Get all stations in a specific H3 cell.

**Input:**

- `cell_index` (string): H3 index of the cell

### get_forecast_for_cell

Get weather forecast for a specific H3 cell.

**Input:**

- `forecast_cell_index` (string): H3 index of the cell
- `forecast_from` (string): Start date (YYYY-MM-DD)
- `forecast_to` (string): End date (YYYY-MM-DD)
- `forecast_include` (string): "daily" or "hourly"

## Installation

1. Clone or download this repository.

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. Set the `WEATHERXMPRO_API_KEY` environment variable with your WeatherXM PRO API key.

## Usage

Run the MCP server:

```bash
npm start
```

### MCP Client Configuration Examples

Add the following configuration to your MCP client settings to connect to the WeatherXM PRO MCP server.

#### Claude Desktop

Edit the MCP settings file located at:

```
~/Library/Application Support/Claude/claude_desktop_config.json
```

Add the WeatherXM PRO MCP server configuration under the `mcpServers` object.

#### VSCode, Cline, and ROO Code

Edit the MCP settings file located at:

```
~/Library/Application Support/Code/User/globalStorage/rooveterinaryinc.roo-cline/settings/mcp_settings.json
```

Add the following configuration under the `mcpServers` object:

```json
"weatherxm-pro": {
  "command": "npx",
  "args": [
    "-y",
    "path to mcp"
  ],
  "env": {
    "WEATHERXMPRO_API_KEY": "your-key"
  }
}
```

Replace `"path to mcp"` with the actual path to the MCP server or package name, and `"your-key"` with your API key.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these guidelines:

- Report bugs or request features by opening an issue.
- Fork the repository and create your feature branch from `main`.
- Write clear, concise commit messages.
- Ensure your code follows the existing style and includes tests where applicable.
- Submit a pull request with a detailed description of your changes.

Thank you for helping improve this project!
## License

MIT License