# 🤖 Roo Browser MCP - Free Computer Vision for Deepseek R1

<div align="center">
  <h2>Enable Deepseek R1 with Free Computer Vision and Browser Control</h2>
  <p>Give your AI the power to see and interact with the web!</p>
</div>

## 🌟 Key Features

- **Free Computer Vision**: Enables Deepseek R1 to see and understand web content
- **Full Browser Control**: Allows Deepseek R1 to interact with any website
- **Zero Cost**: 100% free and open source
- **Easy Integration**: Works seamlessly with Roo Code
- **Real-time Visual Processing**: Live visual feedback for AI decision making

## 🚀 What Can Deepseek R1 Do?

With this MCP server, Deepseek R1 can:
- 👀 See and analyze web content in real-time
- 🖱️ Click and interact with elements on any webpage
- ⌨️ Type and input text naturally
- 📜 Scroll and navigate through content
- 🎯 Make decisions based on visual feedback

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/grapheneaffiliate/roo-browser-mcp.git
cd roo-browser-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## ⚙️ Configuration

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

## 🎮 Available Tools

The server provides these MCP tools for Deepseek R1:

- `launch_browser`: Launch a new browser instance with visual capabilities
- `click`: Click at specific coordinates with visual confirmation
- `type`: Type text with visual feedback
- `scroll`: Navigate through content visually
- `close_browser`: Close the browser instance

## 💡 Usage Example

```typescript
// Using the MCP tools with Deepseek R1
const result = await use_mcp_tool({
  server_name: "browser",
  tool_name: "launch_browser",
  arguments: {
    url: "https://example.com"
  }
});
```

## 🌐 Why This Matters

This project democratizes computer vision capabilities for AI, making it possible for Deepseek R1 to:
- Understand and interact with visual interfaces
- Make decisions based on what it sees
- Navigate the web like a human
- All completely free and open source!

## 📄 License

MIT - Free to use, modify, and distribute!

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

## 📜 Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) for community guidelines.