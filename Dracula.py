from flask import Flask, request
import openai
import os

from dotenv import load_dotenv
load_dotenv()

# Load API keys
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

@app.route("/bot", methods=["POST"])
def bot():
    incoming_msg = request.values.get('Body', '').strip()

    # Send prompt to OpenAI
    prompt = f"ඔබ Sinhala සහ English දෙකෙන්ම පිළිතුරු දෙන්න. පරිශීලකයෝ කියන දේවල්ට හොඳින් තේරුම් ගනින්න:\nUser: {incoming_msg}\nBot:"
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # GPT-4 නම් API access තියෙන්න ඕනෙ
        messages=[{"role": "user", "content": prompt}]
    )

    reply = response['choices'][0]['message']['content'].strip()

    # Respond back to WhatsApp
    return f"""<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>{reply}</Message>
</Response>"""

if __name__ == "__main__":
    app.run()
