import './style.css'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

const downloadBtn = document.querySelector<HTMLButtonElement>('#download-btn')
const loadingOverlay = document.querySelector<HTMLDivElement>('#loading')

if (downloadBtn) {
  downloadBtn.addEventListener('click', async () => {
    try {
      if (loadingOverlay) loadingOverlay.style.display = 'flex'

      const pages = document.querySelectorAll<HTMLElement>('.page')

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'in',
        format: 'letter'
      })

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i]
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: page.offsetWidth,
          height: page.offsetHeight
        })

        const imgData = canvas.toDataURL('image/jpeg', 0.8)

        if (i > 0) {
          pdf.addPage()
        }

        pdf.addImage(imgData, 'JPEG', 0, 0, 8.5, 11, undefined, 'FAST')
      }

      // Use the standard pdf.save method which handles headers and naming correctly
      // The manual blob method was losing the .pdf extension in some cases
      pdf.save('Multizer_Intake_Form.pdf')

    } catch (error) {
      console.error('PDF Generation failed:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      if (loadingOverlay) loadingOverlay.style.display = 'none'
    }
  })
}
