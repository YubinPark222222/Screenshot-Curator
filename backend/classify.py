# classify.py
import openai

openai.api_key = "YOUR_OPENAI_API_KEY"  # 환경변수로 교체 권장

def infer_intent_category(ocr_text: str, image_path: str):
    prompt = f"""
너는 사용자가 왜 이 이미지를 캡처했는지 분석하는 AI야.
다음은 이미지에서 추출된 텍스트야:

\"\"\"{ocr_text}\"\"\"

1. 사용자의 의도를 한 줄로 요약해줘.
2. 이 이미지를 다음 중 어떤 카테고리로 분류할지 골라줘 (노래, 책, 전시, 쇼핑, 일상 등)
3. 관련 태그 3개를 생성해줘 (예: #전시, #인용문, #재즈)

결과는 다음 JSON 형식으로 반환해:
{{ "intent": "...", "category": "...", "tags": ["...", "...", "..."] }}
"""

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "너는 분류와 요약에 능한 어시스턴트야."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )

        content = response.choices[0].message['content']
        # JSON 문자열이 올 경우 eval()로 변환 (실제론 json.loads 권장)
        result = eval(content)
        return result["category"], result["tags"], result["intent"]
    except Exception as e:
        return "분류 오류", [], str(e)
