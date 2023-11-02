import os
from flask import Flask, request, jsonify, Response, send_file
from flask_cors import CORS
import pandas as pd
import json
import requests
from googleapiclient.discovery import build
from google.oauth2 import service_account
from dotenv import load_dotenv
from googleapiclient.http import MediaIoBaseUpload
from googleapiclient.http import MediaIoBaseDownload
from io import BytesIO

app = Flask(__name__)
CORS(app)


# Rota de validação
@app.route('/validar', methods=['POST'])
def validar_arquivo():
    # Validando Upload de acordo com o Template
    try:
        arquivo_recebido = request.files['arquivo']
        template = json.loads(request.form['template'])

        if arquivo_recebido.filename.endswith('.csv'):
            arquivo = pd.read_csv(arquivo_recebido, sep=';', decimal=',', parse_dates=True, dayfirst=True, encoding='latin-1')

            if not arquivo_recebido.filename.endswith(template['extensao']):
                return jsonify({'error': 'A extensão do arquivo não corresponde ao template'})

            if len(arquivo.columns) != template["colunas"]:
                return jsonify({'error': 'O número de colunas está incorreto'})

            if template['linhas'] != 0:
                if len(arquivo) != template["linhas"]:
                    return jsonify({'error': 'O número de linhas está incorreto'})

            colunas_arquivo = arquivo.columns
            for coluna, tipo_esperado in template['campos'].items():
                if coluna not in colunas_arquivo:
                    return jsonify({'error': f'A coluna {coluna} não está presente'})
                else:
                    tipo_dado = str(arquivo[coluna].dtype)

                if tipo_esperado == 'string' and tipo_dado != 'object':
                    return jsonify({'error': f'A coluna {coluna} deve conter strings, mas o tipo real é {tipo_dado}'})

                if tipo_esperado == 'int' and tipo_dado != 'int64':
                    return jsonify({'error': f'A coluna {coluna} deve conter inteiros, mas o tipo real é {tipo_dado}'})

                if tipo_esperado == 'date' and tipo_dado != 'datetime64[ns]':
                    return jsonify({'error': f'A coluna {coluna} deve conter datas, mas o tipo real é {tipo_dado}'})

                if tipo_esperado == 'float' and tipo_dado != 'float64':
                    return jsonify({'error': f'A coluna {coluna} deve conter numeros decimais, mas o tipo real é {tipo_dado}'})


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

            colunas_arquivo = arquivo.columns
            for coluna, tipo_esperado in template['campos'].items():
                if coluna not in colunas_arquivo:
                    return jsonify({'error': f'A coluna {coluna} não está presente'})
                else:
                    tipo_dado = str(arquivo[coluna].dtype)

                if tipo_esperado == 'string' and tipo_dado != 'object':
                    return jsonify({'error': f'A coluna {coluna} deve conter strings, mas o tipo real é {tipo_dado}'})

                if tipo_esperado == 'int' and tipo_dado != 'int64':
                    return jsonify({'error': f'A coluna {coluna} deve conter inteiros, mas o tipo real é {tipo_dado}'})

                if tipo_esperado == 'date' and tipo_dado != 'datetime64[ns]':
                    return jsonify({'error': f'A coluna {coluna} deve conter datas, mas o tipo real é {tipo_dado}'})

                if tipo_esperado == 'float' and tipo_dado != 'float64':
                    return jsonify({'error': f'A coluna {coluna} deve conter numeros decimais, mas o tipo real é {tipo_dado}'})

            
        # Enviando para o Google Drive
        credentials_path = 'backend\\pyApi\\projeto-beaba-chave.json'

        load_dotenv()

        credentials = service_account.Credentials.from_service_account_file(
            credentials_path, scopes=['https://www.googleapis.com/auth/drive']
        )

        drive_service = build('drive', 'v3', credentials=credentials)

        file_metadata = {
            'name': arquivo_recebido.filename,
            'parents': [os.getenv('DRIVE_FOLDER')]
        }

        media = MediaIoBaseUpload(arquivo_recebido, mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', resumable=True)

        file = drive_service.files().create(body=file_metadata, media_body=media, fields='id').execute()
        print(f'Arquivo {arquivo_recebido.filename} enviado com sucesso. ID: {file["id"]}')

        # Persistindo no Banco de Dados
        url = 'http://localhost:5000/salvar-upload'
        id_gdrive = file["id"]
        nome_arquivo = arquivo_recebido.filename
        dados = template
        dados["id_gdrive"] = str(id_gdrive)
        dados["nome_arquivo"] = str(nome_arquivo)
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
            df.to_excel(excel_data, index=False, header=True, engine='xlwt')
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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)
