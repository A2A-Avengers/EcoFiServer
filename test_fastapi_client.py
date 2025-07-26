import asyncio
import httpx
import json


class FastAPIMCPClient:
    """Client for interacting with the FastAPI MCP server"""
    
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
        self.client = httpx.AsyncClient()
    
    async def close(self):
        """Close the HTTP client"""
        await self.client.aclose()
    
    async def connect_to_mcp(self, server_url: str):
        """Connect to MCP server via FastAPI"""
        response = await self.client.post(
            f"{self.base_url}/connect",
            json={"server_url": server_url}
        )
        response.raise_for_status()
        return response.json()
    
    async def disconnect_from_mcp(self):
        """Disconnect from MCP server"""
        response = await self.client.post(f"{self.base_url}/disconnect")
        response.raise_for_status()
        return response.json()
    
    async def get_status(self):
        """Get connection status"""
        response = await self.client.get(f"{self.base_url}/status")
        response.raise_for_status()
        return response.json()
    
    async def list_tools(self):
        """List available tools"""
        response = await self.client.get(f"{self.base_url}/tools")
        response.raise_for_status()
        return response.json()
    
    async def list_resources(self):
        """List available resources"""
        response = await self.client.get(f"{self.base_url}/resources")
        response.raise_for_status()
        return response.json()
    
    async def call_tool(self, tool_name: str, arguments: dict = None):
        """Call a tool"""
        payload = {"tool_name": tool_name}
        if arguments:
            payload["arguments"] = arguments
        
        response = await self.client.post(
            f"{self.base_url}/tools/call",
            json=payload
        )
        response.raise_for_status()
        return response.json()
    
    async def read_resource(self, resource_uri: str):
        """Read a resource"""
        response = await self.client.post(
            f"{self.base_url}/resources/read",
            json={"resource_uri": resource_uri}
        )
        response.raise_for_status()
        return response.json()


async def demo():
    """Demonstrate the FastAPI MCP client"""
    client = FastAPIMCPClient()
    
    try:
        # Check server status
        print("🔍 Checking server status...")
        status = await client.get_status()
        print(f"Status: {json.dumps(status, indent=2)}")
        
        # Connect to MCP server
        mcp_server_url = "http://localhost:8080/mcp/stream"
        print(f"\n🔗 Connecting to MCP server: {mcp_server_url}")
        connect_result = await client.connect_to_mcp(mcp_server_url)
        print(f"Connection result: {json.dumps(connect_result, indent=2)}")
        
        # List tools
        print("\n🛠️ Listing tools...")
        tools = await client.list_tools()
        print(f"Tools: {json.dumps(tools, indent=2)}")
        
        # List resources
        print("\n📦 Listing resources...")
        resources = await client.list_resources()
        print(f"Resources: {json.dumps(resources, indent=2)}")
        
        # Example tool call (you'll need to replace with actual tool names)
        if tools:
            tool_name = tools[0]["name"]
            print(f"\n🔧 Calling tool: {tool_name}")
            tool_result = await client.call_tool(tool_name)
            print(f"Tool result: {json.dumps(tool_result, indent=2)}")
        
        # Example resource read (you'll need to replace with actual resource URIs)
        if resources:
            resource_uri = resources[0]["uri"]
            print(f"\n📖 Reading resource: {resource_uri}")
            resource_result = await client.read_resource(resource_uri)
            print(f"Resource content: {json.dumps(resource_result, indent=2)}")
        
        # Disconnect
        print("\n🔌 Disconnecting...")
        disconnect_result = await client.disconnect_from_mcp()
        print(f"Disconnect result: {json.dumps(disconnect_result, indent=2)}")
        
    except Exception as e:
        print(f"❌ Error: {e}")
    
    finally:
        await client.close()


if __name__ == "__main__":
    print("🚀 FastAPI MCP Client Demo")
    print("Make sure the FastAPI server is running on http://localhost:8000")
    print("=" * 50)
    asyncio.run(demo())
