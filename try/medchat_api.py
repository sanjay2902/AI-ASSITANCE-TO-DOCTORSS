from fastapi import FastAPI, Request
from transformers import pipeline

app = FastAPI()

# Load medical QA pipeline
qa_pipeline = pipeline("question-answering", model="dmis-lab/biobert-base-cased-v1.1")

@app.post("/chat")
async def chat(request: Request):
    body = await request.json()
    question = body.get("question")
    context = body.get("context", "Medical articles from PubMed...")  # You can improve this with a full context

    result = qa_pipeline(question=question, context=context)
    return {"answer": result["answer"]}
