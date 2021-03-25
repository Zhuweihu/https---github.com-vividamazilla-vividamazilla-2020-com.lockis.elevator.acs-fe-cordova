// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default{
  install (Vue, options) {
    Vue.prototype.getPdf = function () {
		
      let title = this.htmlTitle
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint:true,
				scale: 2,
				dpi: 192,
		// height:document.querySelector('#pdfDom').outerHeight(),
		// 419.53, 595.28
      }).then(function (canvas) {
		  console.log(document.getElementById('pdfDom'))
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        // let pageHeight = contentWidth / 592.28 * 841.89   //a4
				let pageHeight = contentWidth / 419.53 * 595.28      //a5
        // let leftHeight = contentHeight
        // let position = 0
        // const imgWidth = 595.28
        // let imgHeight = 592.28 / contentWidth * contentHeight
				
				let leftHeight = contentHeight
				let position = 0
				const imgWidth = 422.53
				let imgHeight = 419.53 / contentWidth * contentHeight
				
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a5')      //a5
				//let PDF = new JsPDF('', 'pt', 'a4')      //a4
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 10, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 595.28
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      }
      )
    }
  }
}

