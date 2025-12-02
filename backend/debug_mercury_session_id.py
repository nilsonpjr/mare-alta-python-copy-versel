import requests
from bs4 import BeautifulSoup
import re

def find_session_id():
    print("Tentando descobrir s_nr_pedido_web...")
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })
    
    login_url = "https://portal.mercurymarine.com.br/epdv/epdv001.asp"
    
    # 1. Login
    login_data = {
        "sUsuar": "31240",
        "sSenha": "2105_kasa",
    }
    print("Fazendo login...")
    resp_login = session.post(login_url, data=login_data)
    
    # 2. Verificar redirecionamento ou conteúdo
    print(f"URL após login: {resp_login.url}")
    
    # Tentar acessar o menu principal ou página de pedidos para ver se o ID aparece
    # URLs prováveis baseadas no histórico:
    # epdv000.asp (Menu?)
    # epdv002.asp (Pedidos?)
    
    urls_to_check = [
        "https://portal.mercurymarine.com.br/epdv/epdv000.asp",
        "https://portal.mercurymarine.com.br/epdv/epdv002.asp",
        "https://portal.mercurymarine.com.br/epdv/epdv002c.asp" # Carrinho?
    ]
    
    for url in urls_to_check:
        print(f"Verificando {url}...")
        resp = session.get(url)
        content = resp.text
        
        # Procurar por s_nr_pedido_web no HTML
        match = re.search(r's_nr_pedido_web=(\d+)', content)
        if match:
            print(f"ENCONTRADO! s_nr_pedido_web = {match.group(1)} na URL/HTML de {url}")
            return match.group(1)
            
        # Procurar em inputs hidden
        soup = BeautifulSoup(content, "html.parser")
        hidden_input = soup.find("input", {"name": "s_nr_pedido_web"}) or soup.find("input", {"name": "h_nr_pedido_web"})
        if hidden_input:
             val = hidden_input.get('value')
             print(f"ENCONTRADO! Input hidden com valor: '{val}' em {url}")
             if not val:
                 with open("debug_mercury_epdv002.html", "w") as f:
                     f.write(soup.prettify())
                 print("HTML salvo em debug_mercury_epdv002.html para análise.")
             return val

    print("Não foi possível encontrar o ID automaticamente.")

if __name__ == "__main__":
    find_session_id()
