import requests
from bs4 import BeautifulSoup

def check_login():
    print("Tentando logar no Mercury...")
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })
    login_url = "https://portal.mercurymarine.com.br/epdv/epdv001.asp"
    
    # 1. GET na página de login
    resp_get = session.get(login_url)
    print(f"GET Login Status: {resp_get.status_code}")
    
    # 2. POST com credenciais
    login_data = {
        "sUsuar": "31240",
        "sSenha": "2105_kasa",
    }
    resp_post = session.post(login_url, data=login_data)
    print(f"POST Login Status: {resp_post.status_code}")
    
    # 3. Verificar se fomos redirecionados ou se estamos na página logada
    # Geralmente, se o login falha, voltamos para o login ou recebemos um erro.
    # Se sucesso, podemos ver um menu ou o título da página inicial.
    
    soup = BeautifulSoup(resp_post.content, "html.parser")
    title = soup.title.string if soup.title else "Sem Título"
    print(f"Título da página pós-login: {title}")
    
    if "epdv001" in resp_post.url or "Login" in title:
        print("Parece que continuamos na página de login. Falha?")
    else:
        print("Parece que o login funcionou (URL mudou ou conteúdo diferente).")
        
    # 4. Tentar acessar uma página interna protegida
    protected_url = "https://portal.mercurymarine.com.br/epdv/epdv000.asp" # Menu principal?
    resp_prot = session.get(protected_url)
    print(f"Acesso Página Protegida Status: {resp_prot.status_code}")
    soup_prot = BeautifulSoup(resp_prot.content, "html.parser")
    print(f"Título Página Protegida: {soup_prot.title.string if soup_prot.title else 'Sem Título'}")

if __name__ == "__main__":
    check_login()
