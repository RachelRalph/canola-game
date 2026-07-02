import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import postcardBackground from "./Assets/Normalized/postcard/PostcardBackground.png";
import yellowFlower from "./Assets/Normalized/stills/flowers/yellow_flower.png";
import whiteFlower from "./Assets/Normalized/stills/flowers/white_flower.png";
import blueFlower from "./Assets/Normalized/stills/flowers/blue_flower.png";
import purpleFlower from "./Assets/Normalized/stills/flowers/purple_flower.png";
import shortRoots from "./Assets/Normalized/stills/roots/ShortRoots.png";
import longRoots from "./Assets/Normalized/stills/roots/LongRoots.png";
import shortPlantFewPods from "./Assets/Normalized/stills/plants/ShortPlant.png";
import tallPlantFewPods from "./Assets/Normalized/stills/plants/TallPlant.png";
import shortPlantManyPods from "./Assets/Normalized/stills/plants/output.png";
import tallPlantManyPods from "./Assets/Normalized/animations/output.webp";
import postcardBack from "./Assets/Normalized/postcard/PostcardBack.png";
import EmailJsHandler from "./EmailJsHandler.js";

const flowerImages = [yellowFlower, whiteFlower, blueFlower, purpleFlower];
const EMAIL = false;
// Keep some headroom below EmailJS's 500 KB limit so the multipart request
// itself does not tip over the server-side threshold.
const MAX_EMAIL_ATTACHMENT_BYTES = 400 * 1024;
const PDF_RENDER_PRESETS = [
  { scale: 1, jpegQuality: 0.84 },
  { scale: 0.82, jpegQuality: 0.7 },
  { scale: 0.68, jpegQuality: 0.58 },
  { scale: 0.56, jpegQuality: 0.48 },
  { scale: 0.45, jpegQuality: 0.38 },
];

function getPlantAssets({ height, pods }) {
  return {
    rootsImage: height === "short" ? shortRoots : longRoots,
    plantImage:
      height === "short"
        ? pods === "many"
          ? shortPlantManyPods
          : shortPlantFewPods
        : pods === "many"
          ? tallPlantManyPods
          : tallPlantFewPods,
  };
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function drawContainImage(ctx, image, x, y, width, height) {
  const scale = Math.min(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  const offsetX = x + (width - drawWidth) / 2;
  const offsetY = y + (height - drawHeight) / 2;
  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

async function canvasToJpegBytes(canvas, quality = 0.94) {
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));
  if (!blob) {
    throw new Error("Failed to render the postcard attachment.");
  }
  return new Uint8Array(await blob.arrayBuffer());
}

function buildPdfFromJpegs(pages) {
  const encoder = new TextEncoder();
  const header = "%PDF-1.4\n";
  const objects = [];

  pages.forEach((page, index) => {
    const imageObjectId = 4 + index * 3;
    const contentsObjectId = 5 + index * 3;
    const pageObjectId = 3 + index * 3;
    const imageName = `/Im${index}`;
    const imageLength = page.jpegBytes.length;
    const pageWidth = page.width;
    const pageHeight = page.height;

    objects.push(`${pageObjectId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /XObject << ${imageName} ${imageObjectId} 0 R >> >> /Contents ${contentsObjectId} 0 R >>\nendobj\n`);
    objects.push(`${imageObjectId} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${pageWidth} /Height ${pageHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageLength} >>\nstream\n`);
    objects.push(page.jpegBytes);
    objects.push("\nendstream\nendobj\n");
    objects.push(`${contentsObjectId} 0 obj\n<< /Length ${encoder.encode(`q ${pageWidth} 0 0 ${pageHeight} 0 0 cm ${imageName} Do Q`).length} >>\nstream\nq ${pageWidth} 0 0 ${pageHeight} 0 0 cm ${imageName} Do Q\nendstream\nendobj\n`);
  });

  const totalObjects = 2 + pages.length * 3;
  const bodyParts = [];
  let offset = encoder.encode(header).length;
  const offsets = ["0000000000 65535 f \n"];

  const pushObject = (object) => {
    const bytes = object instanceof Uint8Array ? object : encoder.encode(object);
    offsets.push(`${String(offset).padStart(10, "0")} 00000 n \n`);
    bodyParts.push(bytes);
    offset += bytes.length;
  };

  pushObject("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  pushObject(`2 0 obj\n<< /Type /Pages /Kids [${pages.map((_, index) => `${3 + index * 3} 0 R`).join(" ")}] /Count ${pages.length} >>\nendobj\n`);

  for (let i = 0; i < objects.length; i += 1) {
    pushObject(objects[i]);
  }

  const body = bodyParts.reduce((accumulator, bytes) => {
    const combined = new Uint8Array(accumulator.length + bytes.length);
    combined.set(accumulator, 0);
    combined.set(bytes, accumulator.length);
    return combined;
  }, new Uint8Array());

  const xrefStart = encoder.encode(header).length + body.length;
  const xref = `xref\n0 ${totalObjects + 1}\n${offsets.join("")}`;
  const trailer = `trailer\n<< /Size ${totalObjects + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  const trailerBytes = encoder.encode(xref + trailer);

  const pdfBytes = new Uint8Array(encoder.encode(header).length + body.length + trailerBytes.length);
  pdfBytes.set(encoder.encode(header), 0);
  pdfBytes.set(body, encoder.encode(header).length);
  pdfBytes.set(trailerBytes, encoder.encode(header).length + body.length);

  return new Blob([pdfBytes], { type: "application/pdf" });
}

async function renderPostcardPdf({ name, height, pods, scale = 1, jpegQuality = 0.94 }) {
  const { rootsImage, plantImage } = getPlantAssets({ height, pods });

  const [background, flower, renderedPlant, renderedRoots] = await Promise.all([
    loadImage(postcardBackground),
    loadImage(flowerImages[1]),
    loadImage(plantImage),
    loadImage(rootsImage),
  ]);

  const width = Math.round(1200 * scale);
  const heightPx = Math.round(800 * scale);
  const artBoxWidth = Math.round(347 * scale);
  const artBoxHeight = Math.round(413 * scale);
  const leftBoxX = Math.round(113 * scale);
  const rightBoxX = Math.round(730 * scale);
  const artBoxY = Math.round(120 * scale);
  const frontCanvas = document.createElement("canvas");
  frontCanvas.width = width;
  frontCanvas.height = heightPx;
  const frontCtx = frontCanvas.getContext("2d");

  frontCtx.drawImage(background, 0, 0, width, heightPx);
  frontCtx.fillStyle = "#1a1a1a";
  frontCtx.textAlign = "center";
  frontCtx.font = `bold ${Math.max(20, Math.round(38 * scale))}px playpen-sans, Georgia, serif`;
  frontCtx.fillText(`${name} THE CANOLA PLANT`, width / 2, Math.round(64 * scale));
  drawContainImage(frontCtx, flower, leftBoxX, artBoxY, artBoxWidth, artBoxHeight);
  drawContainImage(frontCtx, renderedRoots, rightBoxX, Math.round(362 * scale), Math.round(330 * scale), Math.round(190 * scale));
  drawContainImage(frontCtx, renderedPlant, rightBoxX, artBoxY, artBoxWidth, Math.round(320 * scale));

  const frontBytes = await canvasToJpegBytes(frontCanvas, jpegQuality);
  const backCanvas = document.createElement("canvas");
  backCanvas.width = width;
  backCanvas.height = heightPx;
  const backCtx = backCanvas.getContext("2d");
  const postcardBackImage = await loadImage(postcardBack);
  backCtx.drawImage(postcardBackImage, 0, 0, width, heightPx);
  const backBytes = await canvasToJpegBytes(backCanvas, Math.max(0.5, jpegQuality - 0.12));

  return buildPdfFromJpegs([
    { jpegBytes: frontBytes, width, height: heightPx },
    { jpegBytes: backBytes, width, height: heightPx },
  ]);
}

async function renderPostcardPdfWithinLimit({ name, height, pods }) {
  let lastPdfBlob = null;

  for (const preset of PDF_RENDER_PRESETS) {
    const pdfBlob = await renderPostcardPdf({
      name,
      height,
      pods,
      scale: preset.scale,
      jpegQuality: preset.jpegQuality,
    });

    lastPdfBlob = pdfBlob;
    console.log(
      "[EmailModal] PDF attempt",
      JSON.stringify(preset),
      "size (bytes):",
      pdfBlob.size,
    );
    if (pdfBlob.size <= MAX_EMAIL_ATTACHMENT_BYTES) {
      return pdfBlob;
    }
  }

  const sizeInKb = lastPdfBlob ? Math.ceil(lastPdfBlob.size / 1024) : 0;
  throw new Error(
    `The generated PDF is ${sizeInKb} KB, which is too large to send safely through EmailJS.`,
  );
}

export function GetPlantMod({ getRoots, getHeight, getPods }) {
  if (getRoots() === "long" && getHeight() === "short" && getPods() === "many") {
    return (
      <div>
        <p>The adaptions you made fully optimized the food yield and drought tolerance of this plant!</p>
      </div>
    );
  }

  if (getPods() === "many" && (getRoots() === "long" || getHeight() === "short")) {
    return (
      <div>
        <p>Adaptions you made mean that plant delivers increased food yield and increases drought tolerance.</p>
      </div>
    );
  }

  if (getPods() === "many") {
    return (
      <div>
        <p>The adaptions you made increased this plant's food yield.</p>
      </div>
    );
  }

  if (getRoots() === "long" || getHeight() === "short") {
    return (
      <div>
        <p>The adaptions you made mean this plant is more drought tolerant!</p>
      </div>
    );
  }

  return <div />;
}

function EmailModal({ isOpen, getColour, closeModal, getRoots, getHeight, getPods }) {
  const colours = ["yellow", "white", "blue", "purple"];
  const emailHandler = new EmailJsHandler();
  const navigate = useNavigate();
  const modalStyle = {
    content: {
      top: "8vh",
      left: "10vw",
      right: "10vw",
      bottom: "8vh",
      padding: "1.5rem 2rem",
      backgroundColor: "gainsboro",
      border: "none",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      zIndex: 10001,
      overflow: "auto",
    },
    overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0, 0, 0, 0.45)",
      zIndex: 10000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  if (typeof document !== "undefined") {
    Modal.setAppElement(document.getElementById("root"));
  }

  useEffect(() => {
    if (!isOpen) {
      setStatus("");
      return undefined;
    }

    return undefined;
  }, [isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setStatus("Enter a plant name before sending.");
      return;
    }

    if (trimmedName.length > 15) {
      setStatus("Plant name must be 15 characters or fewer.");
      return;
    }

    if (!EMAIL) {
      const searchParams = new URLSearchParams({
        colour: String(getColour()),
        roots: getRoots(),
        height: getHeight(),
        pods: getPods(),
        name: trimmedName,
      });
      closeModal();
      navigate(`/postcard?${searchParams.toString()}`);
      return;
    }

    if (!trimmedEmail) {
      setStatus("Enter an email address before sending.");
      return;
    }

    const fileName = `canola-plant-${trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "summary"}.pdf`;
    try {
      const pdfBlob = await renderPostcardPdfWithinLimit({
        name: trimmedName,
        height: getHeight(),
        pods: getPods(),
      });
      console.log("[EmailModal] Generated PDF size (bytes):", pdfBlob.size);

      await emailHandler.sendPlantPdf({
        pdfBlob,
        fileName,
        plantName: trimmedName,
        recipientEmail: trimmedEmail,
        flowerColour: colours[getColour()],
      });
      setStatus("Email sent.");
      closeModal();
    } catch (error) {
      console.error("EmailJS send failed:", error);
      const errorText = `${error?.message || ""} ${error?.text || ""}`.toLowerCase();
      if (
        errorText.includes("maximum variable sizes") ||
        errorText.includes("attachment variables") ||
        errorText.includes("variable size")
      ) {
        setStatus(
          "EmailJS is treating the PDF as a template variable. In the EmailJS template, add a Form File Attachment named pdf_attachment and keep the field name unchanged.",
        );
        return;
      }

      setStatus(error?.message || "Email could not be sent.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={modalStyle}
      className={"modal"}
      overlayClassName={"email-modal-overlay"}
    >
      <div className="sour-gummy email-modal-content">
        <p>Nicely done! You’ve created a brand new type of canola plant.</p>
        <p>
          Now the flowers are {colours[getColour()]}.
          <br />
          This might change which pollinators prefer them, influencing their reproduction.
          <br />
          Imagine a whole field of {colours[getColour()]} canola!
        </p>
        <p>After the plants are pollinated, the flowers drop off.</p>
        <GetPlantMod getRoots={getRoots} getHeight={getHeight} getPods={getPods} />
        <form onSubmit={handleSubmit}>
          <label className="email-field-label" htmlFor="plant-name">
            Name of your plant:
          </label>
          <input
            id="plant-name"
            name="plant_name"
            className="email-input"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={15}
            autoComplete="off"
            autoCapitalize="words"
            spellCheck="false"
            autoFocus
          />
          {EMAIL ? (
            <>
              <label className="email-field-label" htmlFor="plant-email">
                Email address:
              </label>
              <input
                id="plant-email"
                name="recipient_email"
                className="email-input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
              <button className="email-button" type="submit">
                Email your plant PDF
              </button>
            </>
          ) : (
            <button className="email-button" type="submit">
              View your postcard
            </button>
          )}
          {status ? <p className="email-status">{status}</p> : null}
        </form>
      </div>
    </Modal>
  );
}

export default EmailModal;
