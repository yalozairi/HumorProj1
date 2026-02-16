export default function AuthCodeError() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
        Authentication Error
      </h1>
      <p className="text-white text-xl">There was an error authenticating with the provider. Please try again.</p>
    </main>
  )
}
