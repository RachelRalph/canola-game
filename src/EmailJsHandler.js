const DEFAULT_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
const DEFAULT_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
const DEFAULT_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";
const ATTACHMENT_VARIABLE_NAME = "pdf_attachment";

class EmailJsHandler {
  static initialized = false;

  constructor({
    serviceId = DEFAULT_SERVICE_ID,
    templateId = DEFAULT_TEMPLATE_ID,
    publicKey = DEFAULT_PUBLIC_KEY,
  } = {}) {
    this.serviceId = serviceId;
    this.templateId = templateId;
    this.publicKey = publicKey;
  }

  static async blobToFile(blob, fileName) {
    return new File([blob], fileName, { type: blob.type || "application/pdf" });
  }

  static async blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error || new Error("Failed to read the PDF."));
      reader.readAsDataURL(blob);
    });
  }

  async sendPlantPdf({
    pdfBlob,
    fileName,
    plantName,
    recipientEmail,
    flowerColour,
  }) {
    if (!this.serviceId || !this.templateId || !this.publicKey) {
      throw new Error("Missing EmailJS configuration.");
    }

    const emailjs = window.emailjs;
    if (!emailjs || typeof emailjs.sendForm !== "function") {
      throw new Error("EmailJS browser SDK is not loaded.");
    }

    if (!EmailJsHandler.initialized && typeof emailjs.init === "function") {
      emailjs.init({ publicKey: this.publicKey });
      EmailJsHandler.initialized = true;
    }

    const pdfDataUrl = await EmailJsHandler.blobToDataUrl(pdfBlob);

    return emailjs.send(this.serviceId, this.templateId, {
      plant_name: plantName,
      recipient_email: recipientEmail,
      to_email: recipientEmail,
      pdf_filename: fileName,
      flower_colour: flowerColour,
      [ATTACHMENT_VARIABLE_NAME]: pdfDataUrl,
    }, {
      publicKey: this.publicKey,
    });
  }
}

export default EmailJsHandler;
