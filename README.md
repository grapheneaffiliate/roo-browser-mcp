# Browser Automation MCP Server

This is a Model Context Protocol (MCP) server that provides browser automation capabilities for Roo Code. It enables AI agents to control web browsers through a standardized interface.

## Features

- Browser control (launch, close)
- Mouse interactions (click at coordinates)
- Keyboard input (type text)
- Page navigation (scroll up/down)
- Fixed viewport size (900x600)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/grapheneaffiliates/browser-automation-mcp.git
cd browser-automation-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Configuration

Add the following to your Cline MCP settings file:

```json
{
  "mcpServers": {
    "browser": {
      "command": "node",
      "args": ["path/to/browser-server/build/index.js"],
      "disabled": false,
      "alwaysAllow": []
    }
  }
}
```

## Available Tools

The server provides the following MCP tools:

- `launch_browser`: Launch a new browser instance at a specified URL
- `click`: Click at specific x,y coordinates on the page
- `type`: Type text into the page
- `scroll`: Scroll the page up or down
- `close_browser`: Close the browser instance

## Usage Example

```typescript
// Using the MCP tools in Roo Code
const result = await use_mcp_tool({
  server_name: "browser",
  tool_name: "launch_browser",
  arguments: {
    url: "https://example.com"
  }
});
```

## License

MIT