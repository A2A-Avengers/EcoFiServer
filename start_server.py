#!/usr/bin/env python3
"""
Startup script for the FastAPI MCP Server
"""

import uvicorn
import argparse


def main():
    parser = argparse.ArgumentParser(description="Start FastAPI MCP Server")
    parser.add_argument("--host", default="localhost", help="Host to bind to")
    parser.add_argument("--port", default=8000, type=int, help="Port to bind to")
    parser.add_argument("--reload", action="store_true", help="Enable auto-reload for development")
    parser.add_argument("--log-level", default="info", help="Log level")
    
    args = parser.parse_args()
    
    print(f"🚀 Starting FastAPI MCP Server on {args.host}:{args.port}")
    print(f"📚 API Documentation will be available at: http://{args.host}:{args.port}/docs")
    print(f"📖 Alternative docs at: http://{args.host}:{args.port}/redoc")
    print("=" * 60)
    
    uvicorn.run(
        "fastapi_server:app",
        host=args.host,
        port=args.port,
        reload=args.reload,
        log_level=args.log_level
    )


if __name__ == "__main__":
    main()
