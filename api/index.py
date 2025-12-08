import sys
import os

# Adiciona o diretório raiz do projeto ao PYTHONPATH para importar 'backend'
# No Vercel, o diretório atual é geralmente a raiz do projeto.
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backend"))

try:
    from backend.main import app
except ImportError as e:
    # Fallback caso a importação direta falhe
    print(f"Erro ao importar backend.main: {e}")
    try:
        from main import app
    except ImportError as e2:
        print(f"Erro ao importar main: {e2}")
        raise e2

# O Vercel precisa da variável 'app' exposta
