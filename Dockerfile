FROM python:3.13-slim

WORKDIR /app

# Copy only necessary files first
COPY pyproject.toml .
RUN pip install --no-cache-dir .

# Copy app code
COPY . .

EXPOSE 8000

CMD ["uvicorn", "fastapi_server:app", "--host", "0.0.0.0", "--port", "8000"]
