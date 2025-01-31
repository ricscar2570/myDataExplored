import openai
import pandas as pd
from flask import Flask, request, jsonify

app = Flask(__name__)
openai.api_key = "TUO_OPENAI_API_KEY"

@app.route("/generate-insights", methods=["POST"])
def insights():
    try:
        data = request.json["data"]
        df = pd.DataFrame(data)
        prompt = f"Analizza il dataset e suggerisci trend:
{df.to_string()}"
        
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}]
        )
        return jsonify({"insights": response["choices"][0]["message"]["content"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5002)