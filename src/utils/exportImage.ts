import { toPng } from 'html-to-image';

export async function exportElementAsPng(element: HTMLElement, filename = 'notification-preview.png'): Promise<boolean> {
  try {
    const dataUrl = await toPng(element, {
      quality: 0.95,
      pixelRatio: 2,
      cacheBust: true,
    });

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (error) {
    console.error('Failed to export image', error);
    return false;
  }
}
