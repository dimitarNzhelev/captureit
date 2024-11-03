'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from "next/link"
import { motion } from 'framer-motion'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import { Card, CardContent } from "~/components/ui/card"
import { Camera, ArrowLeft, Upload } from "lucide-react"
import { useSession } from 'next-auth/react'

const MotionLink = motion(Link)

export default function CreatePostPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [image, setImage] = useState<File | null>(null)
  const [caption, setCaption] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!image) {
      console.error("Image is required");
      return;
    }
  
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = async () => {
      const base64Image = reader.result?.toString().split(",")[1];
  
      try {
        const response = await fetch("/api/posts/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            caption,
            image: base64Image,
          }),
        });
  
        if (response.ok) {
          router.push("/posts");
        } else {
          console.error("Failed to create post");
        }
      } catch (error) {
        console.error("Error creating post:", error);
      }
    };
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click()
  }

  if (!session) {
    router.push('/api/auth/signin')
    return null
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed w-full z-10 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <MotionLink 
            href="/" 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Camera className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold">CaptureIt.</span>
          </MotionLink>
          <MotionLink
            href="/posts"
            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            whileHover={{ x: -2 }}
            whileTap={{ x: 0 }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </MotionLink>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="max-w-md mx-auto bg-gray-900 border-purple-500">
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                  Create New Post
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <div 
                      onClick={triggerImageUpload}
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple-500 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors"
                    >
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-10 h-10 mb-3 text-purple-500" />
                          <p className="mb-2 text-sm text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      )}
                      <Input 
                        id="image" 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleImageChange} 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Textarea
                      id="caption"
                      placeholder="Write a caption for your post..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="w-full bg-gray-800 border-gray-700 text-white"
                      rows={4}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-600 hover:bg-purple-700 transition-colors"
                  >
                    Post
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 CaptureIt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}