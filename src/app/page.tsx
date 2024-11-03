'use client'

import Link from "next/link"
import { motion } from 'framer-motion'
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { useSession } from 'next-auth/react'
import LandingPosts from 'constants/posts'
import { useEffect } from "react"

const MotionLink = motion(Link)

export default function HomePage() {
  const { data: session, status } = useSession()



  return (
    <div className="min-h-screen bg-black text-white">

      {status === 'loading' ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ):(
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
            {session ? (
              <Link href="/posts/new">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Add Posts
                </Button>
              </Link>
            ) : (
          <Link href="api/auth/signin">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              Get Started
            </Button>
            </Link>
            )}
          </motion.div>
        </motion.section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Featured Photos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {LandingPosts.map((post) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: post.id * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="group"
                >
                  <Card className="bg-gray-900 overflow-hidden border-purple-500 border-opacity-0 group-hover:border-opacity-100 transition-all duration-300">
                    <CardContent className="p-0 relative">
                      <img
                        src={post.imageUrl}
                        alt="Random photo"
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center mb-2">
                          <p className="text-sm text-purple-300">@{post.username}</p>
                        </div>
                        <p className="mt-2 text-white">{post.caption}</p>
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
            {session ? (
              <Link href="/posts/new">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto">
                  Add Posts
                </Button>
              </Link>
            ) : (
            <Link href="api/auth/signin">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto">
                Get Started
              </Button>
            </Link>
            )}
            </motion.div>
            {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="w-full md:w-auto border-purple-500 text-purple-400 hover:bg-purple-700 hover:text-white">
                Learn More
              </Button>
            </motion.div> */}
          </div>
        </motion.section>
      </main>
      )}
      
    </div>
  )
}