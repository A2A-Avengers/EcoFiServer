# Use official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install build tools (optional but safe for pydantic or compiled dependencies)
RUN apt-get update && apt-get install -y build-essential && \
    rm -rf /var/lib/apt/lists/*

# Copy project metadata
COPY pyproject.toml ./

# Install dependencies (requires pip 21.3+)
RUN pip install --upgrade pip setuptools wheel && \
    pip install .

# Copy the rest of the source code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run your FastAPI app
CMD ["uvicorn", "fastapi_server:app", "--host", "0.0.0.0", "--port", "8000"]
