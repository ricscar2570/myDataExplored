import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from sklearn.ensemble import IsolationForest

app = Flask(__name__)

@app.route("/detect-anomalies", methods=["POST"])
def anomalies():
    try:
        data = request.json["data"]
        df = pd.DataFrame(data)
        
        model = IsolationForest(contamination=0.05)
        df["anomaly"] = model.fit_predict(df[["value"]])
        anomalies = df[df["anomaly"] == -1]
        
        return jsonify({"anomalies": anomalies.to_dict(orient="records")})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5003)