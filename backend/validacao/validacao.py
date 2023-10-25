import pandas as pd

template = {
    "id": "b61754bb-68ed-4f86-8995-8bc365e3c97c",
    "nome": "Clientes",
    "extensao": ".xlsx",
    "colunas": 5,
    "linhas": 2,
    "squad": "Mercantil",
    "criador": "6b824325-ca69-4c6c-997f-bc82eaf76d40",
    "status": True,
    "campos": {
        "Nome": "string",
        "Idade": "int",
        "Cidade": "string",
        "Data de nascimento": "date",
        "Total de pedidos feitos": "int"
    },
    "data_criacao": "2023-10-22T00:05:00.262Z"
}

arquivo_excel = pd.read_excel("D:\\Códigos\\Projetos\\QQTech\\backend\\validacao\\arquivo_valido.xlsx")
numero_colunas = len(arquivo_excel.columns)
numero_linhas = len(arquivo_excel)

if numero_colunas != template["colunas"]:
    print("O numero de colunas está incorreto")

if numero_linhas != template["linhas"]:
    print("O numero de linhas está incorreto")
else:
    print("O numero de linhas está correto")

colunas_arquivo = arquivo_excel.columns
for coluna, tipo_esperado in template["campos"].items():
    if coluna not in colunas_arquivo:
        print(f'A coluna {coluna} não está presente')
    else:
        tipo_dado = str(arquivo_excel[coluna].dtype)
    
    if tipo_esperado == "string" and tipo_dado != "object":
        print(f"A coluna {coluna} deve conter strings, mas o tipo real é {tipo_dado}")

    if tipo_esperado == "int" and tipo_dado != "int64":
        print(f"A coluna {coluna} deve conter inteiros, mas o tipo real é {tipo_dado}")

    if tipo_esperado == "date" and tipo_dado != "datetime64[ns]":
        print(f"A coluna {coluna} deve conter datas, mas o tipo real é {tipo_dado}")
    
    if tipo_esperado == "float" and tipo_dado != "float64":
        print(f"A coluna {coluna} deve conter numeros decimais, mas o tipo real é {tipo_dado}")

if not "arquivo_valido.xlsx".endswith(template["extensao"]):
    print("A extensão do arquivo não corresponde ao template")