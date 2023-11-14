import os
from flask import Flask, request, jsonify, Response, send_file
from flask_cors import CORS
import pandas as pd
from sqlalchemy import create_engine
import json
import requests
import xlwt
import openpyxl
from googleapiclient.discovery import build
from google.oauth2 import service_account
from dotenv import load_dotenv
from googleapiclient.http import MediaIoBaseUpload
from googleapiclient.http import MediaIoBaseDownload
from io import BytesIO
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)


# Rota de validação
@app.route('/validar', methods=['POST'])
def validar_arquivo():
    # Validando Upload de acordo com o Template
    try:
        arquivo_recebido = request.files['arquivo']
        template = json.loads(request.form['template'])
        pasta_selecionada = request.form['repositorio_selecionado']

        if arquivo_recebido.filename.endswith('.csv'):
            arquivo = pd.read_csv(arquivo_recebido, sep=';', decimal=',', parse_dates=True, dayfirst=True, encoding='latin-1')

            if not arquivo_recebido.filename.endswith(template['extensao']):
                return jsonify({'error': 'A extensão do arquivo não corresponde ao template'})

            if len(arquivo.columns) != template["colunas"]:
                return jsonify({'error': 'O número de colunas está incorreto'})

            if template['linhas'] != 0:
                if len(arquivo) != template["linhas"]:
                    return jsonify({'error': 'O número de linhas está incorreto'})

            for coluna, tipo_esperado in template['campos'].items():
                colunas_arquivo = arquivo[arquivo.columns]
                if coluna not in colunas_arquivo:
                    return jsonify({'error': f'A coluna {coluna} não está presente'})

                for valor_celula in colunas_arquivo[coluna].values:
                    tipo_real = type(valor_celula).__name__
                    #print(f'Esperado: {tipo_esperado}')
                    #print(tipo_real)
               
                    if tipo_esperado == 'str' and tipo_real != 'str':
                        return jsonify({'error': f'A coluna {coluna} deve conter strings, mas o tipo recebido não é compatível'})

                    if tipo_esperado == 'int' and tipo_real != 'int64':
                        return jsonify({'error': f'A coluna {coluna} deve conter inteiros, mas o tipo recebido não é compatível'})

                    if tipo_esperado == 'date' and tipo_real != 'datetime64[ns]':
                        return jsonify({'error': f'A coluna {coluna} deve conter datas, mas o tipo recebido não é compatível'})

                    if tipo_esperado == 'float' and tipo_real != 'float64':
                        return jsonify({'error': f'A coluna {coluna} deve conter numeros decimais, mas o tipo recebido não é compatível'})


        if arquivo_recebido.filename.endswith('.xlsx') or arquivo_recebido.filename.endswith('.xls'):
            arquivo = pd.read_excel(arquivo_recebido)

            if not arquivo_recebido.filename.endswith(template['extensao']):
                return jsonify({'error': 'A extensão do arquivo não corresponde ao template'})

            numero_colunas = len(arquivo.columns)
            numero_linhas = len(arquivo)

            if numero_colunas != template['colunas']:
                return jsonify({'error': 'O número de colunas está incorreto'})

            if template['linhas'] != 0:
                if numero_linhas != template['linhas']:
                    return jsonify({'error': 'O número de linhas está incorreto'})

            for coluna, tipo_esperado in template['campos'].items():
                colunas_arquivo = arquivo[arquivo.columns]
                if coluna not in colunas_arquivo:
                    return jsonify({'error': f'A coluna {coluna} não está presente'})

                for valor_celula in colunas_arquivo[coluna].values:
                    tipo_real = type(valor_celula).__name__
                    #print(tipo_real)
               
                    if tipo_esperado == 'str' and tipo_real != 'str':
                        return jsonify({'error': f'A coluna {coluna} deve conter strings, mas o tipo recebido não é compatível'})

                    if tipo_esperado == 'int' and tipo_real != 'int64':
                        return jsonify({'error': f'A coluna {coluna} deve conter inteiros, mas o tipo recebido não é compatível'})

                    if tipo_esperado == 'date' and tipo_real != 'datetime64':
                        return jsonify({'error': f'A coluna {coluna} deve conter datas, mas o tipo recebido não é compatível'})

                    if tipo_esperado == 'float' and tipo_real != 'float64':
                        return jsonify({'error': f'A coluna {coluna} deve conter numeros decimais, mas o tipo recebido não é compatível'})

        # Enviando para o Google Drive
        credentials_path = 'backend\\pyApi\\projeto-beaba-chave.json'

        load_dotenv()

        credentials = service_account.Credentials.from_service_account_file(
            credentials_path, scopes=['https://www.googleapis.com/auth/drive']
        )

        drive_service = build('drive', 'v3', credentials=credentials)

        if pasta_selecionada == "Mercantil":
            repositorio_destino = os.getenv('DRIVE_MERCANTIL')
            file_metadata = {
                'name': arquivo_recebido.filename,
                'parents': [repositorio_destino]
            }
        elif pasta_selecionada == "Cartão":
            repositorio_destino = os.getenv('DRIVE_CARTAO')
            file_metadata = {
                'name': arquivo_recebido.filename,
                'parents': [repositorio_destino]
            }
        elif pasta_selecionada == "Mobile":
            repositorio_destino = os.getenv('DRIVE_MOBILE')
            file_metadata = {
                'name': arquivo_recebido.filename,
                'parents': [repositorio_destino]
            }
        elif pasta_selecionada == "DA":
            repositorio_destino = os.getenv('DRIVE_DA')
            file_metadata = {
                'name': arquivo_recebido.filename,
                'parents': [repositorio_destino]
            }
        elif pasta_selecionada == "Business TECH":
            repositorio_destino = os.getenv('DRIVE_BUSINESSTECH')
            file_metadata = {
                'name': arquivo_recebido.filename,
                'parents': [repositorio_destino]
            }

        media = MediaIoBaseUpload(arquivo_recebido, mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', resumable=True)

        file = drive_service.files().create(body=file_metadata, media_body=media, fields='id').execute()
        print(f'Arquivo {arquivo_recebido.filename} enviado com sucesso. No repositório {pasta_selecionada}. Com o ID: {file["id"]}')

        # Persistindo no Banco de Dados
        url = 'http://localhost:5000/salvar-upload'
        id_gdrive = file["id"]
        nome_arquivo = arquivo_recebido.filename
        dados = template
        dados["id_gdrive"] = str(id_gdrive)
        dados["nome_arquivo"] = str(nome_arquivo)
        dados["squad"] = str(pasta_selecionada)
        response = requests.post(url, json=dados)

        if response.status_code == 200:
            return jsonify({'sucesso': 'Seu arquivo foi validado e enviado com sucesso!'})
        else:
            return jsonify({'error': 'Seu arquivo foi validado com sucesso e enviado, porém houve uma falha ao persisti-lo no banco de dados'})

    except Exception as e:
        return jsonify({'error': str(e)})


# Rota de download dos arquivos na pagina Uploads do usuario
@app.route('/download/<string:id>/<string:nome>', methods=['GET'])
def download_arquivo(id, nome):
    try:
        # Credenciais do Google Drive
        credentials_path = 'backend\\pyApi\\projeto-beaba-chave.json'

        load_dotenv()

        credentials = service_account.Credentials.from_service_account_file(
            credentials_path, scopes=['https://www.googleapis.com/auth/drive']
        )

        drive_service = build('drive', 'v3', credentials=credentials)

        request = drive_service.files().get_media(fileId=id)
        file_data = BytesIO()
        downloader = MediaIoBaseDownload(file_data, request)

        done = False
        while done is False:
            status, done = downloader.next_chunk()

        # Configurar cabeçalhos para download do arquivo
        response = Response(file_data.getvalue())
        response.headers['Content-Type'] = 'application/octet-stream'
        response.headers['Content-Disposition'] = f'attachment; filename={nome}'

        return response

    except Exception as e:
        return jsonify({'error': str(e)})


# Rota de criação de arquivos dos templates para download do usuario
@app.route('/template-download', methods=['GET', 'POST'])
def download_template():
    if request.method == 'POST':
        template_data = request.json
        extensao = template_data.get('extensao')
        nome = template_data.get('nome')
        campos = template_data.get('campos')

        df = pd.DataFrame(columns=campos.keys())

        if extensao == '.xlsx':
            excel_data = BytesIO()
            df.to_excel(excel_data, index=False, header=True)
            mimetype = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            download_nome = f'{nome}.xlsx'
        elif extensao == '.xls':
            excel_data = BytesIO()
            df.to_excel(excel_data, index=False, header=True, engine='openpyxl')
            mimetype = 'application/vnd.ms-excel'
            download_nome = f'{nome}.xls'
        elif extensao == '.csv':
            excel_data = BytesIO()
            df.to_csv(excel_data, index=False, sep=';', decimal=',', date_format='%d/%m/%Y')
            mimetype = 'text/csv'
            download_nome = f'{nome}.csv'

        excel_data.seek(0)

        return send_file(excel_data, mimetype=mimetype, as_attachment=True, download_name=download_nome)

    return 'Envie um arquivo JSON com os dados do template via POST.'


# Rota de criação e consulta dos relatorios
@app.route('/relatorios', methods=['GET'])
def criar_relatorios():
    try:
        db_config = {
            'host': 'localhost',
            'port': '5432',
            'database': 'projeto_beaba',
            'user': 'postgres',
            'password': 'postgres'
        }

        query = 'SELECT * FROM beaba."Uploads"'

        def query_to_dataframe(query, db_config):
            connection_string = f"postgresql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}"
            engine = create_engine(connection_string)
            dataframe = pd.read_sql_query(query, engine)
            return dataframe

        df= query_to_dataframe(query, db_config)

        df["datas_uploads"] = pd.to_datetime(df["data_upload"])
        df=df.sort_values("datas_uploads")
        df['ano_mes'] = df['data_upload'].apply(lambda x: str(x.year) + "-" + str(x.month))

        df_json = df.to_json(orient='records')

        return df_json

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
