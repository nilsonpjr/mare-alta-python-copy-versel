from fastapi import FastAPI
import sys
import os

# Adiciona o diretório 'backend' ao path do sistema para que possamos importar 'main'
sys.path.append(os.path.join(os.path.dirname(__file__), '../backend'))

from main import app

# Handler para Vercel Serverless Function
# O Vercel procura por uma variável 'app' (que é a nossa instância FastAPI)
