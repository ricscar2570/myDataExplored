# Import necessary libraries
import pandas as pd  # Library for data manipulation
import pymongo  # MongoDB client for Python
from datetime import datetime  # For handling date and time
import os  # For interacting with the operating system

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")  # Update the URI as needed
db = client["dashboard"]  # Use or create the database "dashboard"
collection = db["data"]  # Use or create the collection "data"

# Function to validate and process the dataset
def validate_and_process_data(df):
    # Check if required columns are present
    required_columns = {'category', 'value'}
    if not required_columns.issubset(df.columns):
        raise ValueError(f"Dataset must contain the following columns: {required_columns}")

    # Ensure the 'value' column is numeric
    if not pd.api.types.is_numeric_dtype(df['value']):
        raise ValueError("'value' column must contain numeric data")

    # Handle the 'timestamp' column
    if 'timestamp' not in df.columns:
        # Add current timestamp if the column is missing
        df['timestamp'] = datetime.now()
    else:
        # Convert timestamp column to datetime and validate
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
        if df['timestamp'].isnull().any():
            raise ValueError("Invalid datetime format in 'timestamp' column")

    return df

# Function to load data into MongoDB
def load_data(file_path):
    try:
        # Load the dataset based on file extension
        if file_path.endswith('.csv'):
            df = pd.read_csv(file_path)  # Load CSV files
        elif file_path.endswith(('.xls', '.xlsx')):
            df = pd.read_excel(file_path)  # Load Excel files
        else:
            raise ValueError("Unsupported file format. Please upload a CSV or Excel file.")
        
        # Validate and process the dataset
        df = validate_and_process_data(df)

        # Insert data into MongoDB
        collection.insert_many(df.to_dict('records'))
        print(f"Successfully inserted {len(df)} records into MongoDB.")
    except Exception as e:
        print(f"Error: {e}")

# Main function to handle file input and processing
if __name__ == "__main__":
    # Prompt the user to enter the file path
    file_path = input("Enter the path to your CSV or Excel file: ").strip()
    
    # Check if the file exists
    if not os.path.exists(file_path):
        print("File does not exist. Please provide a valid file path.")
    else:
        # Process and load the data
        load_data(file_path)
