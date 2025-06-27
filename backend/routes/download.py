#Accepts text and returns downloadable PDF of the result
from fastapi import APIRouter, Response, HTTPException
from fpdf import FPDF
from pydantic import BaseModel
import datetime

router = APIRouter()

class PDFData(BaseModel):
    question: str
    answer: str

@router.post("/download")
def download_pdf(data: PDFData):
    try:
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.multi_cell(0, 10, f"Lexora AI Report\n\nDate: {datetime.datetime.now()}\n\nQuestion:\n{data.question}\n\nAnswer:\n{data.answer}")
        
        pdf_output = f"Lexora_Report_{datetime.datetime.now().strftime('%Y%m%d%H%M%S')}.pdf"
        pdf.output(pdf_output)

        with open(pdf_output, "rb") as f:
            pdf_bytes = f.read()

        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename={pdf_output}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
