# HumorProj1

This is a Next.js application that uses Supabase for authentication with Google OAuth to protect a route.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add the following environment variables:

    ```
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

    You can get these values from your Supabase project dashboard.

3.  **Configure Supabase:**

    - In your Supabase project, go to the "Authentication" section and then "Providers".
    - Enable the "Google" provider.
    - Enter the following Google OAuth Client ID: `388960353527-fh4grc6mla425lg0e3g1hh67omtrdihd.apps.googleusercontent.com`
    - In the "Authentication" -> "URL Configuration" section, add `http://localhost:3000/auth/callback` to the "Redirect URLs".

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

You can deploy this application to Vercel. Make sure to set the environment variables in your Vercel project settings. You will also need to add your Vercel deployment URL to the "Redirect URLs" in your Supabase project settings.