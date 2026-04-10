'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useRef } from 'react'

const API_BASE = 'https://api.almostcrackd.ai'

interface Caption {
  id: string
  content: string
  [key: string]: unknown
}

type Step = 'idle' | 'presign' | 'upload' | 'register' | 'captions' | 'done' | 'error'

export default function UploadForm() {
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [step, setStep] = useState<Step>('idle')
  const [captions, setCaptions] = useState<Caption[]>([])
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    setFile(selected)
    setCaptions([])
    setStep('idle')
    setErrorMsg('')
    setUploadedImageUrl(null)
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target?.result as string)
    reader.readAsDataURL(selected)
  }

  const handleSubmit = async () => {
    if (!file) return

    setErrorMsg('')
    setCaptions([])
    setUploadedImageUrl(null)

    try {
      // Get JWT access token
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token
      if (!token) throw new Error('Not authenticated')

      const authHeader = { Authorization: `Bearer ${token}` }

      // Step 1: Generate presigned URL
      setStep('presign')
      const presignRes = await fetch(`${API_BASE}/pipeline/generate-presigned-url`, {
        method: 'POST',
        headers: { ...authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentType: file.type }),
      })
      if (!presignRes.ok) throw new Error(`Presign failed: ${presignRes.status}`)
      const { presignedUrl, cdnUrl } = await presignRes.json()

      // Step 2: Upload image bytes to presigned URL
      setStep('upload')
      const uploadRes = await fetch(presignedUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file,
      })
      if (!uploadRes.ok) throw new Error(`Upload failed: ${uploadRes.status}`)
      setUploadedImageUrl(cdnUrl)

      // Step 3: Register image URL in pipeline
      setStep('register')
      const registerRes = await fetch(`${API_BASE}/pipeline/upload-image-from-url`, {
        method: 'POST',
        headers: { ...authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: cdnUrl, isCommonUse: false }),
      })
      if (!registerRes.ok) throw new Error(`Register failed: ${registerRes.status}`)
      const { imageId } = await registerRes.json()

      // Step 4: Generate captions
      setStep('captions')
      const captionsRes = await fetch(`${API_BASE}/pipeline/generate-captions`, {
        method: 'POST',
        headers: { ...authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageId }),
      })
      if (!captionsRes.ok) throw new Error(`Caption generation failed: ${captionsRes.status}`)
      const captionData = await captionsRes.json()
      setCaptions(Array.isArray(captionData) ? captionData : [])

      setStep('done')
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error')
      setStep('error')
    }
  }

  const stepLabel: Record<Step, string> = {
    idle: '',
    presign: 'Step 1/4: Generating upload URL...',
    upload: 'Step 2/4: Uploading image...',
    register: 'Step 3/4: Registering image...',
    captions: 'Step 4/4: Generating captions...',
    done: '',
    error: '',
  }

  const isLoading = ['presign', 'upload', 'register', 'captions'].includes(step)

  return (
    <div className="w-full max-w-2xl flex flex-col gap-6">
      {/* File picker */}
      <div
        className="border-2 border-dashed border-purple-500 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-purple-300 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/heic"
          className="hidden"
          onChange={handleFileChange}
        />
        {preview ? (
          <img src={preview} alt="Preview" className="max-h-64 rounded-lg object-contain" />
        ) : (
          <div className="text-center">
            <p className="text-purple-400 text-lg font-semibold">Click to select an image</p>
            <p className="text-gray-400 text-sm mt-1">JPEG, PNG, WebP, GIF, HEIC supported</p>
          </div>
        )}
      </div>

      {file && (
        <p className="text-gray-300 text-sm text-center">{file.name} ({(file.size / 1024).toFixed(1)} KB)</p>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!file || isLoading}
        className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? stepLabel[step] : 'Generate Captions'}
      </button>

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-500"
              style={{
                width:
                  step === 'presign' ? '25%' :
                  step === 'upload'  ? '50%' :
                  step === 'register'? '75%' :
                  '90%'
              }}
            />
          </div>
          <p className="text-purple-300 text-sm animate-pulse">{stepLabel[step]}</p>
        </div>
      )}

      {/* Error */}
      {step === 'error' && (
        <div className="bg-red-900 border border-red-500 rounded-xl p-4">
          <p className="text-red-300 font-semibold">Error: {errorMsg}</p>
        </div>
      )}

      {/* Results */}
      {step === 'done' && captions.length > 0 && (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-white">Generated Captions</h2>
          {uploadedImageUrl && (
            <img src={uploadedImageUrl} alt="Uploaded" className="w-full max-h-64 object-cover rounded-xl" />
          )}
          {captions.map((caption, idx) => (
            <div key={caption.id ?? idx} className="bg-gray-800 rounded-xl p-4">
              <p className="text-white text-lg">{caption.content}</p>
            </div>
          ))}
        </div>
      )}

      {step === 'done' && captions.length === 0 && (
        <p className="text-gray-400 text-center">No captions were returned.</p>
      )}
    </div>
  )
}
