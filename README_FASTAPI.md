# FastAPI MCP Client Server

This project converts the original MCP (Model Context Protocol) client into a FastAPI server that maintains persistent connections to MCP servers while exposing REST API endpoints.

## Features

- **Persistent Session Management**: Maintains MCP client session across HTTP requests
- **RESTful API**: All original client functions exposed as REST endpoints
- **Automatic Documentation**: FastAPI provides interactive API docs
- **Error Handling**: Proper HTTP status codes and error messages
- **Async Operations**: Fully asynchronous for better performance

## Installation

1. Install dependencies:
```bash
uv sync
```

## Usage

### 1. Start the FastAPI Server

```bash
python fastapi_server.py
```

The server will start on `http://localhost:8000`

### 2. Access API Documentation

Visit `http://localhost:8000/docs` for interactive API documentation (Swagger UI)
Visit `http://localhost:8000/redoc` for alternative documentation

### 3. Using the API

#### Connect to MCP Server
```http
POST /connect
Content-Type: application/json

{
    "server_url": "http://localhost:8080/mcp/stream"
}
```

#### Check Connection Status
```http
GET /status
```

#### List Available Tools
```http
GET /tools
```

#### List Available Resources
```http
GET /resources
```

#### Call a Tool
```http
POST /tools/call
Content-Type: application/json

{
    "tool_name": "example_tool",
    "arguments": {
        "param1": "value1",
        "param2": "value2"
    }
}
```

#### Read a Resource
```http
POST /resources/read
Content-Type: application/json

{
    "resource_uri": "status://server"
}
```

#### Disconnect from MCP Server
```http
POST /disconnect
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Root endpoint with server info |
| POST | `/connect` | Connect to MCP server |
| POST | `/disconnect` | Disconnect from MCP server |
| GET | `/status` | Get connection status |
| GET | `/tools` | List available tools |
| GET | `/resources` | List available resources |
| POST | `/tools/call` | Call a specific tool |
| POST | `/resources/read` | Read a specific resource |
| GET | `/tools/{tool_name}` | Get info about specific tool |
| GET | `/resources/{resource_uri}` | Get specific resource content |

## Testing with the Test Client

Run the test client to see the API in action:

```bash
python test_fastapi_client.py
```

## Session Management

The FastAPI server maintains a single global session to the MCP server. This means:

- **Persistent Connection**: Once connected, the session remains active across multiple HTTP requests
- **State Management**: The server maintains connection state and ensures the session is available for all operations
- **Error Handling**: Automatic reconnection handling and proper cleanup
- **Thread Safety**: Session operations are properly managed in the async context

## Benefits over Original Client

1. **Web Service**: Can be used by any HTTP client (browsers, mobile apps, other services)
2. **Multiple Consumers**: Multiple clients can use the same MCP connection
3. **Better Error Handling**: HTTP status codes and structured error responses
4. **API Documentation**: Automatic documentation generation
5. **Monitoring**: Easy to add logging, metrics, and monitoring
6. **Scalability**: Can be deployed behind load balancers, in containers, etc.

## Error Handling

The server provides proper HTTP status codes:
- `200`: Success
- `400`: Bad request (e.g., not connected to MCP server)
- `404`: Resource not found
- `500`: Internal server error

Error responses include detailed error messages to help with debugging.

## Example with curl

```bash
# Connect to MCP server
curl -X POST "http://localhost:8000/connect" \
     -H "Content-Type: application/json" \
     -d '{"server_url": "http://localhost:8080/mcp/stream"}'

# List tools
curl -X GET "http://localhost:8000/tools"

# Call a tool
curl -X POST "http://localhost:8000/tools/call" \
     -H "Content-Type: application/json" \
     -d '{"tool_name": "example_tool", "arguments": {}}'

# Disconnect
curl -X POST "http://localhost:8000/disconnect"
```
