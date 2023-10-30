import os
from googleapiclient.discovery import build
from google.oauth2 import service_account
from googleapiclient.http import MediaFileUpload
from dotenv import load_dotenv

def upload_to_google_drive(file_path, file_name):
    # Configure o caminho para o arquivo JSON de credenciais do Google Cloud
    credentials_path = 'backend\\validacao\\projeto-beaba-chave.json'

    load_dotenv()

    # Crie um objeto de credenciais usando o arquivo JSON
    credentials = service_account.Credentials.from_service_account_file(
        credentials_path, scopes=['https://www.googleapis.com/auth/drive']
    )

    # Crie um serviço Google Drive
    drive_service = build('drive', 'v3', credentials=credentials)

    # Configure os metadados do arquivo
    file_metadata = {
        'name': file_name,
        'parents': [os.getenv('DRIVE_FOLDER')]
    }

    media = MediaFileUpload(file_path, mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', resumable=True)

    # Faça o upload do arquivo
    file = drive_service.files().create(body=file_metadata, media_body=media, fields='id').execute()
    print(f'Arquivo {file_name} enviado com sucesso. ID: {file["id"]}')

upload_to_google_drive('backend\\validacao\\arquivo_clientes.xlsx', 'testedotenv')