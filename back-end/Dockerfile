FROM python:3.14-slim-bookworm 

# environment
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# work direcory
WORKDIR /app

# copy requirements.txt and install it on the server
COPY requirements.txt /app/
RUN pip install --no-cache-dir uv && \ 
    uv pip install --system --break-system-packages --no-cache-dir -r requirements.txt
    
COPY . .

EXPOSE 8000

CMD ["gunicorn", "prettypin.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]