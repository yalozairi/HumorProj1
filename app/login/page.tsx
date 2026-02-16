import LoginForm from './login-form'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-8">
        Login
      </h1>
      <LoginForm />
    </main>
  )
}
