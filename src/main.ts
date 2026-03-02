import './style.css'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

const downloadBtn = document.querySelector<HTMLButtonElement>('#download-btn')
const loadingOverlay = document.querySelector<HTMLDivElement>('#loading')

// Tab switching logic (Only if elements exist)
const tabButtons = document.querySelectorAll<HTMLButtonElement>('.tab-btn');
const versions = document.querySelectorAll<HTMLDivElement>('.version-container');

if (tabButtons.length > 0 && versions.length > 0) {
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      if (!target) return;

      // Update active button
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update visible version
      versions.forEach(v => {
        if (v.id === `${target}-version`) {
          v.classList.add('active');
        } else {
          v.classList.remove('active');
        }
      });
    });
  });
}

// PDF Generation Logic
if (downloadBtn) {
  downloadBtn.addEventListener('click', async () => {
    try {
      if (loadingOverlay) loadingOverlay.style.display = 'flex'

      // Find the active version container or default to the body/app
      let pagesContainer: HTMLElement | null = document.querySelector('.version-container.active');
      if (!pagesContainer) {
        pagesContainer = document.querySelector('#app');
      }

      const pages = pagesContainer?.querySelectorAll<HTMLElement>('.page');
      if (!pages || pages.length === 0) {
        throw new Error('No pages found to generate PDF');
      }

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

      // Determine Filename
      let fileName = 'Multizer_Intake_Form.pdf';
      if (pagesContainer?.id === 'easy-version' || document.title.includes('Easy')) {
        fileName = 'Ramada_Tukwila_Easy_Intake.pdf';
      }

      pdf.save(fileName)

    } catch (error) {
      console.error('PDF Generation failed:', error)
      alert('Failed to generate PDF. Please try again.')
    } finally {
      if (loadingOverlay) loadingOverlay.style.display = 'none'
    }
  })
}
