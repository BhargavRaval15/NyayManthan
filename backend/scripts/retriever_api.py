from fastapi import FastAPI
from pydantic import BaseModel
#from langchain.embeddings import OpenAIEmbeddings
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()

vectorstore_dir = os.path.join(os.path.dirname(__file__), '../books/chunks/chroma_vectorstore')
#embeddings = OpenAIEmbeddings()
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectorstore = Chroma(persist_directory=vectorstore_dir, embedding_function=embeddings)

class QueryRequest(BaseModel):
    query: str
    k: int = 3

@app.post("/retrieve")
def retrieve(req: QueryRequest):
    results = vectorstore.similarity_search(req.query, k=req.k)
    return {"chunks": [r.page_content for r in results]}
