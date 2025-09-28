# create_vector_store.py
"""
Python script to embed all text chunks and store them in a Chroma vector store using LangChain and OpenAI embeddings.
Run this from your backend folder: python backend/scripts/create_vector_store.py
"""
import os
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain.docstore.document import Document
from dotenv import load_dotenv

load_dotenv()

chunks_dir = os.path.join(os.path.dirname(__file__), '../books/chunks')
vectorstore_dir = os.path.join(chunks_dir, 'chroma_vectorstore')

# Gather all chunk files
docs = []
for fname in os.listdir(chunks_dir):
    if fname.endswith('.txt'):
        with open(os.path.join(chunks_dir, fname), encoding='utf-8') as f:
            content = f.read()
            docs.append(Document(page_content=content, metadata={"source": fname}))

# Create vector store with HuggingFace embeddings
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vectorstore = Chroma.from_documents(docs, embeddings, persist_directory=vectorstore_dir)
vectorstore.persist()
print(f"Vector store created and saved to {vectorstore_dir}")
