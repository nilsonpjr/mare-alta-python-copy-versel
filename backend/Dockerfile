# Estágio 1: Build do Frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Estágio 2: Backend com Playwright
FROM python:3.9-slim

WORKDIR /app

# Instalar dependências do sistema para Playwright
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    fonts-liberation \
    libappindicator1 \
    libasound2 \
    curl \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Copiar requirements e instalar dependências Python
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Instalar browsers Playwright
RUN playwright install chromium
RUN playwright install-deps chromium

# Copiar código do backend
COPY backend/ .

# Copiar o frontend buildado do estágio 1
# O backend espera encontrar ../frontend/dist, então vamos replicar essa estrutura
# Ou melhor, vamos colocar dentro de /app/frontend/dist e ajustar o main.py se necessário
# Mas como o main.py faz os.path.join(os.path.dirname(...), "frontend", "dist"), ele sobe um nível.
# Se backend está em /app, ele sobe para /, e procura /frontend/dist.
# Então vamos copiar para /frontend/dist na raiz? Não, workdir é /app.
# main.py está em /app/main.py. dirname é /app. dirname(dirname) é /.
# Então ele procura /frontend/dist.
COPY --from=frontend-build /app/frontend/dist /frontend/dist

# Expor porta
EXPOSE 8000

# Comando de inicialização
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
