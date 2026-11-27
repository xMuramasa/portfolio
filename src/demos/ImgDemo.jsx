import { useState } from 'react'

const fmt = (bytes) =>
  bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(2)} MB`
    : `${(bytes / 1024).toFixed(1)} KB`

const MSG = {
  en: {
    drop: 'Drop an image here (or click) → get WebP back',
    notImage: 'That is not an image.',
    decode: 'Could not decode that image.',
    smaller: 'smaller',
    download: 'Download',
    preview: 'converted preview',
  },
  es: {
    drop: 'Suelta una imagen aquí (o haz clic) → recibe un WebP',
    notImage: 'Eso no es una imagen.',
    decode: 'No se pudo leer esa imagen.',
    smaller: 'más liviana',
    download: 'Descargar',
    preview: 'vista previa convertida',
  },
}

// Real in-browser version of what img-transformer does server-side:
// decode any image, re-encode as WebP, report the savings.
export default function ImgDemo({ lang }) {
  const m = MSG[lang]
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [dragging, setDragging] = useState(false)

  async function convert(file) {
    setError(null)
    if (!file?.type.startsWith('image/')) {
      setError('notImage')
      return
    }
    try {
      const bitmap = await createImageBitmap(file)
      const canvas = document.createElement('canvas')
      canvas.width = bitmap.width
      canvas.height = bitmap.height
      canvas.getContext('2d').drawImage(bitmap, 0, 0)
      const blob = await new Promise((res) => canvas.toBlob(res, 'image/webp', 0.8))
      if (result) URL.revokeObjectURL(result.url)
      setResult({
        url: URL.createObjectURL(blob),
        name: file.name.replace(/\.\w+$/, '.webp'),
        before: file.size,
        after: blob.size,
        width: bitmap.width,
        height: bitmap.height,
      })
    } catch {
      setError('decode')
    }
  }

  return (
    <div className="demo">
      <label
        className={`dropzone${dragging ? ' dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); convert(e.dataTransfer.files[0]) }}
      >
        <input type="file" accept="image/*" hidden onChange={(e) => convert(e.target.files[0])} />
        {m.drop}
      </label>
      {error && <p className="demo-error">{m[error]}</p>}
      {result && (
        <div className="img-result">
          <img src={result.url} alt={m.preview} />
          <div>
            <p><strong>{result.name}</strong> · {result.width}×{result.height}</p>
            <p>
              {fmt(result.before)} → {fmt(result.after)}{' '}
              <span className={result.after < result.before ? 'good' : ''}>
                ({Math.round((1 - result.after / result.before) * 100)}% {m.smaller})
              </span>
            </p>
            <a className="btn" href={result.url} download={result.name}>{m.download}</a>
          </div>
        </div>
      )}
    </div>
  )
}
