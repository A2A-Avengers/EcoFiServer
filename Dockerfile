# Use official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install pip, setuptools, wheel
RUN apt-get update && apt-get install -y build-essential && \
    pip install --upgrade pip setuptools wheel

# Copy pyproject files and install dependencies
COPY pyproject.toml .
COPY uv.lock .
RUN pip install .

# Copy the rest of the application code
COPY . .

# Expose the FastAPI port
EXPOSE 8000

# Run the FastAPI app with Uvicorn
CMD ["uvicorn", "fastapi_server:app", "--host", "0.0.0.0", "--port", "8000"]
