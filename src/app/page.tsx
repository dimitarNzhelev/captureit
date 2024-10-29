'use client'

import { useState } from 'react'
import Link from "next/link"
import { motion } from 'framer-motion'
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Camera, LogIn, Menu, X, Heart, MessageCircle, Share2 } from "lucide-react"

const MotionLink = motion(Link)

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
          <nav className="hidden md:flex space-x-4 items-center">
            <MotionLink 
              href="/posts" 
              className="hover:text-purple-400 transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              All Posts
            </MotionLink>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="bg-purple-600 hover:bg-purple-700 border-none">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </motion.div>
          </nav>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      {isMenuOpen && (
        <motion.div 
          className="fixed inset-0 bg-black z-20 flex flex-col items-center justify-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <MotionLink 
            href="/posts" 
            className="text-2xl hover:text-purple-400 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(false)}
          >
            All Posts
          </MotionLink>
          <Button variant="outline" size="lg" onClick={() => setIsMenuOpen(false)} className="bg-purple-600 hover:bg-purple-700 border-none">
            <LogIn className="h-5 w-5 mr-2" />
            Sign In
          </Button>
        </motion.div>
      )}

      <main>
        <motion.section 
          className="py-32 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Capture and Share Your Moments
          </h1>
          <p className="text-xl mb-8 text-gray-400">Join our community of photographers and visual storytellers</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started
            </Button>
          </motion.div>
        </motion.section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Featured Photos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="group"
                >
                  <Card className="bg-gray-900 overflow-hidden border-purple-500 border-opacity-0 group-hover:border-opacity-100 transition-all duration-300">
                    <CardContent className="p-0 relative">
                      <img
                        src={`https://source.unsplash.com/random/400x300?${i}`}
                        alt="Random photo"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center mb-2">
                          <Avatar className="h-6 w-6 mr-2 ring-2 ring-purple-500">
                            <AvatarImage src={`https://i.pravatar.cc/150?img=${i}`} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-purple-300">@username{i}</p>
                        </div>
                        <p className="mt-2 text-white">A captivating moment captured in time. #CaptureIt</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <motion.section 
          className="py-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Ready to start sharing?</h2>
          <p className="text-xl mb-8 text-gray-400">Sign up now and get access to our vibrant community</p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto">
                Sign Up with Google
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="w-full md:w-auto border-purple-500 text-purple-400 hover:bg-purple-700 hover:text-white">
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 CaptureIt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}