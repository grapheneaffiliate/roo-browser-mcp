#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import puppeteer from 'puppeteer';

class BrowserServer {
  private server: Server;
  private browser: puppeteer.Browser | null = null;
  private page: puppeteer.Page | null = null;

  constructor() {
    this.server = new Server(
      {
        name: 'browser-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
    
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.cleanup();
      process.exit(0);
    });
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'launch_browser',
          description: 'Launch a new browser instance at the specified URL',
          inputSchema: {
            type: 'object',
            properties: {
              url: {
                type: 'string',
                description: 'URL to navigate to',
              },
            },
            required: ['url'],
          },
        },
        {
          name: 'click',
          description: 'Click at specific coordinates on the page',
          inputSchema: {
            type: 'object',
            properties: {
              x: {
                type: 'number',
                description: 'X coordinate',
              },
              y: {
                type: 'number',
                description: 'Y coordinate',
              },
            },
            required: ['x', 'y'],
          },
        },
        {
          name: 'type',
          description: 'Type text into the page',
          inputSchema: {
            type: 'object',
            properties: {
              text: {
                type: 'string',
                description: 'Text to type',
              },
            },
            required: ['text'],
          },
        },
        {
          name: 'scroll',
          description: 'Scroll the page',
          inputSchema: {
            type: 'object',
            properties: {
              direction: {
                type: 'string',
                enum: ['up', 'down'],
                description: 'Direction to scroll',
              },
            },
            required: ['direction'],
          },
        },
        {
          name: 'close_browser',
          description: 'Close the browser instance',
          inputSchema: {
            type: 'object',
            properties: {},
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      switch (request.params.name) {
        case 'launch_browser':
          return await this.launchBrowser(request.params.arguments.url);
        case 'click':
          return await this.click(request.params.arguments.x, request.params.arguments.y);
        case 'type':
          return await this.type(request.params.arguments.text);
        case 'scroll':
          return await this.scroll(request.params.arguments.direction);
        case 'close_browser':
          return await this.closeBrowser();
        default:
          throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
      }
    });
  }

  private async launchBrowser(url: string) {
    if (this.browser) {
      await this.cleanup();
    }

    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 900,
        height: 600,
      },
    });

    this.page = await this.browser.newPage();
    await this.page.goto(url);

    return {
      content: [
        {
          type: 'text',
          text: `Browser launched and navigated to ${url}`,
        },
      ],
    };
  }

  private async click(x: number, y: number) {
    if (!this.page) {
      throw new McpError(ErrorCode.InvalidRequest, 'Browser not launched');
    }

    await this.page.mouse.click(x, y);

    return {
      content: [
        {
          type: 'text',
          text: `Clicked at coordinates (${x}, ${y})`,
        },
      ],
    };
  }

  private async type(text: string) {
    if (!this.page) {
      throw new McpError(ErrorCode.InvalidRequest, 'Browser not launched');
    }

    await this.page.keyboard.type(text);

    return {
      content: [
        {
          type: 'text',
          text: `Typed text: ${text}`,
        },
      ],
    };
  }

  private async scroll(direction: 'up' | 'down') {
    if (!this.page) {
      throw new McpError(ErrorCode.InvalidRequest, 'Browser not launched');
    }

    const scrollAmount = direction === 'down' ? 600 : -600;
    await this.page.evaluate((amount) => {
      window.scrollBy(0, amount);
    }, scrollAmount);

    return {
      content: [
        {
          type: 'text',
          text: `Scrolled ${direction}`,
        },
      ],
    };
  }

  private async closeBrowser() {
    await this.cleanup();
    return {
      content: [
        {
          type: 'text',
          text: 'Browser closed',
        },
      ],
    };
  }

  private async cleanup() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Browser MCP server running on stdio');
  }
}

const server = new BrowserServer();
server.run().catch(console.error);