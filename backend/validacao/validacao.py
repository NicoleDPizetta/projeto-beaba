from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import json 

app = Flask(__name__)
CORS(app)

@app.route('/validar', methods=['POST'])

def validar_arquivo():
    try:
        arquivo = request.files['arquivo']
        template = json.loads(request.form['template'])

        arquivo_excel = pd.read_excel(arquivo)
        numero_colunas = len(arquivo_excel.columns)
        numero_linhas = len(arquivo_excel)

        if numero_colunas != template['colunas']:
            return jsonify({'error': 'O número de colunas está incorreto'}), 400

        if template['linhas'] != 0:
            if numero_linhas != template['linhas']:
                return jsonify({'error': 'O número de linhas está incorreto'})
            else:
                return jsonify({'result': 'O número de linhas está correto'})

        colunas_arquivo = arquivo_excel.columns
        for coluna, tipo_esperado in template['campos'].items():
            if coluna not in colunas_arquivo:
                return jsonify({'error': f'A coluna {coluna} não está presente'})
            else:
                tipo_dado = str(arquivo_excel[coluna].dtype)
            
            if tipo_esperado == 'string' and tipo_dado != 'object':
                return jsonify({'error': f'A coluna {coluna} deve conter strings, mas o tipo real é {tipo_dado}'})

            if tipo_esperado == 'int' and tipo_dado != 'int64':
                return jsonify({'error': f'A coluna {coluna} deve conter inteiros, mas o tipo real é {tipo_dado}'})

            if tipo_esperado == 'date' and tipo_dado != 'datetime64[ns]':
                return jsonify({'error': f'A coluna {coluna} deve conter datas, mas o tipo real é {tipo_dado}'})
            
            if tipo_esperado == 'float' and tipo_dado != 'float64':
                return jsonify({'error': f'A coluna {coluna} deve conter numeros decimais, mas o tipo real é {tipo_dado}'})
        
        if not arquivo.filename.endswith(template['extensao']):
            return jsonify({'error': 'A extensão do arquivo não corresponde ao template'})
        
        return jsonify({'sucesso': 'Seu arquivo foi validado e enviado com sucesso!'})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)