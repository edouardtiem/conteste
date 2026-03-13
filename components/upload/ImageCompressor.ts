/**
 * Compresse une image via canvas resize.
 * Si le fichier est un PDF, il est retourne tel quel.
 * Les images sont redimensionnees a max 1600px de largeur, qualite JPEG 0.82.
 * Cible : ~700KB max.
 */

const MAX_WIDTH = 1600;
const JPEG_QUALITY = 0.82;
const TARGET_SIZE = 700 * 1024; // 700KB

export async function compressImage(file: File): Promise<Blob> {
  // PDF : pas de compression
  if (file.type === "application/pdf") {
    return file;
  }

  // Charger l'image dans un element Image
  const imageBitmap = await createImageFromFile(file);

  // Calculer les dimensions
  let { width, height } = imageBitmap;
  if (width > MAX_WIDTH) {
    const ratio = MAX_WIDTH / width;
    width = MAX_WIDTH;
    height = Math.round(height * ratio);
  }

  // Dessiner sur un canvas
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Impossible de creer le contexte canvas");
  }

  ctx.drawImage(imageBitmap, 0, 0, width, height);

  // Compresser en JPEG
  let quality = JPEG_QUALITY;
  let blob = await canvasToBlob(canvas, "image/jpeg", quality);

  // Si toujours trop gros, reduire la qualite progressivement
  while (blob.size > TARGET_SIZE && quality > 0.4) {
    quality -= 0.1;
    blob = await canvasToBlob(canvas, "image/jpeg", quality);
  }

  return blob;
}

function createImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Impossible de charger l'image"));
    };
    img.src = URL.createObjectURL(file);
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Echec de la compression"));
        }
      },
      type,
      quality
    );
  });
}
