import requests
from bs4 import BeautifulSoup
import re

def get_mercury_session() -> requests.Session:
    session = requests.Session()
    session.headers.update({
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    })
    login_url = "https://portal.mercurymarine.com.br/epdv/epdv001.asp"
    session.get(login_url)
    login_data = {
        "sUsuar": "31240",
        "sSenha": "2105_kasa",
    }
    session.post(login_url, data=login_data)
    return session

def search_warranty_requests(nro_motor: str):
    print(f"Searching for serial: {nro_motor}")
    session = get_mercury_session()
    url_warranty = f"https://portal.mercurymarine.com.br/epdv/ewr010.asp?s_nr_serie={nro_motor}"
    response = session.get(url_warranty)
    soup = BeautifulSoup(response.content, "html.parser")
    
    print(f"Page Title: {soup.title.string if soup.title else 'No Title'}")
    
    if nro_motor.upper() not in soup.get_text().upper():
        print("Serial NOT found in text.")
        with open("debug_mercury_output.html", "w") as f:
            f.write(soup.prettify())
        print("Saved HTML to debug_mercury_output.html")
        return None

    try:
        row = soup.select_one("tr.Row")
        if not row:
            print("Row not found")
            return None
            
        cells = row.find_all("td")
        if len(cells) < 6:
            print(f"Not enough cells: {len(cells)}")
            return None

        nro_serie = cells[0].get_text(strip=True)
        modelo = cells[1].get_text(strip=True)
        dt_venda = cells[2].get_text(strip=True)
        status_garantia = cells[4].get_text(strip=True)
        vld_garantia = cells[5].get_text(strip=True)
        
        print(f"Found data: {nro_serie}, {modelo}, {dt_venda}, {status_garantia}, {vld_garantia}")
        return True
    except Exception as e:
        print(f"Error parsing: {e}")
        return None

if __name__ == "__main__":
    search_warranty_requests("2B567890")
